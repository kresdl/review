import firebase from 'firebase/app'
import { Photo } from 'types'
import { getUser } from './auth'

type Refs = Record<string, number>

const db = firebase.firestore()

export const getUserRef = (uid?: string) =>
    db.collection('users').doc(uid || getUser().uid)


export const addUser = (id: string, name: string, lastName: string, email: string) =>
    db.collection('users')
        .doc(id)
        .set({ name, lastName, email })

export const addAlbum = (title: string) =>
    getUserRef()
        .collection('albums')
        .doc(title)
        .set({ title, photos: [] }, { merge: true })

export const renameAlbum = (title: string, newTitle: string) =>
    getUserRef()
        .collection('albums')
        .doc(title)
        .update({ title: newTitle })

export const prepareAddPhoto = async (album: string) => {
    const userRef = getUserRef()

    const albumRef = userRef.collection('albums').doc(album)
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

export const removePhotoFromAlbum = async (name: string, albumTitle: string) =>
    db.runTransaction(async transaction => {
        const userRef = getUserRef()

        const albumRef = userRef.collection('albums').doc(albumTitle)
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

export const removeAlbum = async (title: string) => {
    const userRef = getUserRef()

    const statRef = userRef.collection('stat').doc('refs')
    const statDoc = await statRef.get()
    if (!statDoc.exists) throw Error('No ref doc')

    const albumRef = userRef.collection('albums').doc(title)
    const albumDoc = await albumRef.get()
    if (!albumDoc.exists) throw Error('No album')

    const array = albumDoc.data()!.photos as Photo[]
    albumRef.delete()

    const refs = statDoc.data() as Refs

    const newRefs = array.reduce<Refs>((acc, { name }) => ({
        ...acc,
        [name]: refs[name] - 1
    }), {})

    statRef.set(newRefs, { merge: true })

    return array.reduce<string[]>(
        (arr, { name }) => newRefs[name] ? arr : [...arr, name],
        []
    )
}