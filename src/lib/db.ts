import firebase from 'firebase/app'
import { Album, Stat } from 'types'
import { getUser } from './auth'

const db = firebase.firestore()

type Snapshot = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>

const toIndexed = (snapshot: Snapshot) =>
    ({ id: snapshot.id, ...snapshot.data() })

const getUserRef = () =>
    db.collection('users').doc(getUser().uid)

export const addUser = (id: string, name: string, lastName: string, email: string) =>
    db.collection('users')
        .doc(id)
        .set({ name, lastName, email })

export const addAlbum = (title: string) =>
    getUserRef()
        .collection('albums')
        .doc(title)
        .set({ title, photos: [] })

export const getAlbums = async () => {
    const snapshot = await getUserRef()
        .collection('albums')
        .get()

    return snapshot.docs.map(toIndexed) as Album[];
}

export const getAlbum = async (title: string) => {
    const snapshot = await getUserRef()
        .collection('albums')
        .doc(title)
        .get()
        
    return snapshot.data() as Album
}

export const addPhotoToAlbum = async (albumTitle: string, photo: string) =>
    db.runTransaction(async transaction => {
        const userRef = getUserRef()

        const albumRef = userRef.collection('albums').doc(albumTitle)        
        const albumDoc = await transaction.get(albumRef)        
        const array: string[] = albumDoc.data()!.photos

        if (array.includes(photo)) return true

        const statRef = userRef.collection('stat').doc(photo)
        const statDoc = await transaction.get(statRef)
        const count: number = statDoc.data()?.count ?? 0

        transaction.update(albumRef, { photos: [...array, photo] })
            .set(statRef, { count: count + 1 })

        return !!count
    })

export const removePhotoFromAlbum = async (albumTitle: string, photo: string) =>
    db.runTransaction(async transaction => {
        const userRef = getUserRef()
        const statRef = userRef.collection('stat').doc(photo)
        const albumRef = userRef.collection('albums').doc(albumTitle)

        const statDoc = await transaction.get(statRef)
        const albumDoc = await transaction.get(albumRef)

        const array: string[] = albumDoc.data()!.photos
        const count: number = statDoc.data()!.count

        transaction.update(albumRef, { photos: array.filter(e => e !== photo) })
        const isMore = count > 1

        if (isMore) transaction.set(statRef, { count: count - 1 })
        else transaction.delete(statRef)

        return isMore
    })

export const deleteAlbum = (title: string) =>
    getUserRef().collection('albums')
        .doc(title)
        .delete()
