import firebase from 'firebase/app'
import { Album, Index, Photo, SavedAlbum } from 'types'
import { getUser } from './auth'

type Refs = Record<string, number>

const db = firebase.firestore()

export const getUserRef = (uid?: string) =>
    db.collection('users').doc(uid || getUser().uid)

export const addUser = (id: string, name: string, lastName: string, email: string) =>
    db.collection('users')
        .doc(id)
        .set({ name, lastName, email })

export const grantGuest = (email: string, albumId: string) => 
    getUserRef()
        .collection('albums')
        .doc(albumId)
        .update({ granted: firebase.firestore.FieldValue.arrayUnion(email) })

export const addAlbum = (title: string) =>
    getUserRef()
        .collection('albums')
        .doc()
        .set({ 
            title, 
            photos: [],
            granted: [],
        }, { merge: true })

export const renameAlbum = (id: string, newTitle: string) =>
    getUserRef()
        .collection('albums')
        .doc(id)
        .update({ title: newTitle })

export const prepareAddPhoto = async (albumId: string) => {
    const userRef = getUserRef()

    const albumRef = userRef.collection('albums').doc(albumId)
    const albumDoc = await albumRef.get()
    if (!albumDoc.exists) throw Error('No album')

    const statRef = userRef.collection('stat').doc('refs')
    const statDoc = await statRef.get()

    const array = albumDoc.data()!.photos as Photo[]

    return (name: string, url: string) => {
        if (array.some(photo => photo.name === name)) throw Error('Photo already in album')

        const batch = db.batch()
        const count: number = statDoc.data()?.[name] ?? 0

        return batch.update(albumRef,
            { photos: firebase.firestore.FieldValue.arrayUnion({ name, url } as Photo) }
        )
            .set(statRef, { [name]: count + 1 }, { merge: true })
            .commit()
    }
}

export const removePhotoFromAlbum = async (name: string, albumId: string) =>
    db.runTransaction(async transaction => {
        const userRef = getUserRef()

        const albumRef = userRef.collection('albums').doc(albumId)
        const albumDoc = await transaction.get(albumRef)
        if (!albumDoc.exists) throw Error('No album')

        const array = albumDoc.data()!.photos as Photo[]
        if (!array.some(photo => photo.name === name)) throw Error('Photo not in album')

        const statRef = userRef.collection('stat').doc('refs')
        const statDoc = await transaction.get(statRef)
        if (!statDoc.exists) throw Error('No ref doc')

        const count: number = statDoc.data()?.[name] ?? 0
        if (!count) throw Error('No ref count')

        transaction.update(albumRef, { photos: array.filter(photo => photo.name !== name) })
            .set(statRef, { [name]: count - 1 }, { merge: true })

        return count - 1
    })

export const removeAlbum = async (id: string) => {
    const userRef = getUserRef()

    const albumRef = userRef.collection('albums').doc(id)
    const albumDoc = await albumRef.get()
    if (!albumDoc.exists) throw Error('No album')

    const photos = albumDoc.data()!.photos as Photo[]
    albumRef.delete()

    const statRef = userRef.collection('stat').doc('refs')
    const statDoc = await statRef.get()

    const refs = statDoc.data() as Refs | undefined
    if (!refs) return []

    const newRefs = photos.reduce<Refs>((acc, { name }) => ({
        ...acc,
        [name]: refs[name] - 1
    }), {})

    statRef.set(newRefs, { merge: true })

    return photos.map(p => p.name)
        .filter(n => !newRefs[n])
}

export const subscribe = (onUpdate: (index: Index) => void) =>
    getUserRef()
        .collection('albums')
        .onSnapshot(
            async snapshot => {
                const index = snapshot.docs.reduce<Index>((acc, doc) => {
                    const album = doc.data() as Album
                    const saved = { id: doc.id, ...album } as SavedAlbum
                    return {
                        ...acc,
                        [doc.id]: saved
                    }
                }, {})

                onUpdate(index)
            },
            console.log
        )