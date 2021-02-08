import firebase from 'firebase/app'
import { Photo } from 'types'
import { getUser } from './auth'

type Refs = Record<string, number>

const db = firebase.firestore()

export default db

export const addUser = (id: string, name: string, lastName: string, email: string) =>
    db.collection('users')
        .doc(id)
        .set({ name, lastName, email })

export const grantGuest = (email: string, albumId: string) =>
    db.collection('albums')
        .doc(albumId)
        .update({ granted: firebase.firestore.FieldValue.arrayUnion(email) })

export const addAlbum = (title: string, photos?: Photo[], uid?: string) =>
    db.collection('albums')
        .add({
            user: uid || getUser().uid,
            title,
            photos: photos || [],
            granted: [],
        })

export const renameAlbum = (id: string, newTitle: string) =>
    db.collection('albums')
        .doc(id)
        .update({ title: newTitle })

export const clonePhotos = async (photos: Photo[], albumName: string) => {
    await addAlbum(albumName, photos)
    const { uid } = getUser()

    const statRef = db.collection('stat').doc(uid)
    const statDoc = await statRef.get()
    const stat = statDoc.data() as Refs

    const newStat = photos.reduce((acc, { name }) => ({
        ...acc,
        [name]: stat[name] + 1
    }), stat)

    return statRef.set(newStat)
}

export const acceptPhotos = async (email: string, photos: Photo[], ownerId: string) => {
    await addAlbum(email, photos, ownerId)

    const statRef = db.collection('stat').doc(ownerId)
    const statDoc = await statRef.get()
    const stat = statDoc.data() as Refs

    const newStat = photos.reduce((acc, { name }) => ({
        ...acc,
        [name]: stat[name] + 1
    }), stat)

    return statRef.set(newStat)
}

export const removePhotoFromAlbum = async (photo: string, albumId: string) =>
    db.runTransaction(async transaction => {
        const { uid } = getUser()

        const albumRef = db.collection('albums').doc(albumId)
        const albumDoc = await transaction.get(albumRef)
        if (!albumDoc.exists) throw Error('No album')

        const array = albumDoc.data()!.photos as Photo[]
        if (!array.some(p => p.name === photo)) throw Error('Photo not in album')

        const statRef = db.collection('stat').doc(uid)
        const statDoc = await transaction.get(statRef)
        if (!statDoc.exists) throw Error('No ref doc')

        const count: number = statDoc.data()?.[photo] ?? 0
        if (!count) throw Error('No ref count')

        transaction.update(albumRef, { photos: array.filter(p => p.name !== photo) })
            .set(statRef, { [photo]: count - 1 }, { merge: true })

        return count - 1
    })

export const removeAlbum = async (id: string) => {
    const { uid } = getUser()

    const albumRef = db.collection('albums').doc(id)
    const albumDoc = await albumRef.get()
    if (!albumDoc.exists) throw Error('No album')

    const photos = albumDoc.data()!.photos as Photo[]
    albumRef.delete()

    const statRef = db.collection('stat').doc(uid)
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

export const prepareAddPhotos = async (albumId: string) => {
    const { uid } = getUser()

    const albumRef = db.collection('albums').doc(albumId)
    const albumDoc = await albumRef.get()
    if (!albumDoc.exists) throw Error('No album')

    const statRef = db.collection('stat').doc(uid)
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
