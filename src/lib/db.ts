import firebase from 'firebase/app'
import { Album } from 'types'
import { getUser } from './auth'
import _ from 'lodash'

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

        const statRef = userRef.collection('stat').doc(photo)
        const statDoc = await transaction.get(statRef)
        const count: number = statDoc.data()?.count ?? 0

        if (array.includes(photo)) return count

        transaction.update(albumRef, { photos: [...array, photo] })
            .set(statRef, { count: count + 1 })

        return count + 1
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

        if (count > 1) transaction.set(statRef, { count: count - 1})
        else transaction.delete(statRef)

        return count - 1
    })

type Rec = Record<string, number>

export const deleteAlbum = async (title: string) => {
    const userRef = getUserRef()
    const albumRef = userRef.collection('albums').doc(title)
    const statRef = userRef.collection('stat')

    const albumDoc = await albumRef.get()
    const { photos } = albumDoc.data() as Album

    if (!photos.length) {
        albumRef.delete()
        return [] as string[]
    }

    const statDocs = await statRef
        .where(firebase.firestore.FieldPath.documentId(), 'in', photos)
        .get()

    const stat = statDocs.docs.reduce<Rec>(
        (acc, doc) => ({ ...acc, [doc.id]: doc.data().count - 1 }), {}
    )

    const toKeep = Object.keys(_.pickBy(stat, Boolean))
    const toDelete = Object.keys(_.omitBy(stat, Boolean))

    const batch = db.batch()

    for (let photo of toKeep) {
        batch.set(statRef.doc(photo), { count: stat[photo] })
    }

    for (let photo of toDelete) {
        batch.delete(statRef.doc(photo))
    }

    batch.delete(albumRef)
    await batch.commit()    
    return toDelete
}
