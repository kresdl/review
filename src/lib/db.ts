import firebase from 'firebase/app'
import auth from './auth'
import { Album } from 'types'
import { getUser } from 'lib/auth'

const db = firebase.firestore()

type Snapshot = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>

const toIndexed = (snapshot: Snapshot) => 
    ({ id: snapshot.id, ...snapshot.data() })

export default db

export const addUser = (id: string, name: string, lastName: string, email: string) => 
    db.collection('users')
    .doc(id)
    .set({ name, lastName, email })

export const addAlbum = (title: string) => {
    const user = getUser()

    return db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .doc(title)
        .set({ title, photos: [] }) 
}
  
export const getAlbums = async () => {
    const user = getUser()

    const snapshot = await db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .get()

    return snapshot.docs.map(toIndexed) as Album[];
}
  
export const getAlbum = async (albumId: string) => {
    const user = getUser()

    const snapshot = await db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .doc(albumId)
        .get()
    
    return snapshot.data() as Album
}

export const addPhotoToAlbum = (albumId: string, photoPath: string) => {
    const user = getUser()

    return db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .doc(albumId)
        .update({ photos: firebase.firestore.FieldValue.arrayUnion(photoPath) })
}

export const removePhotoFromAlbum = (albumId: string, photoPath: string) => {
    const user = getUser()

    return db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .doc(albumId)
        .update({ photos: firebase.firestore.FieldValue.arrayRemove(photoPath) })
}

export const deleteAlbum = (albumId: string) => {
    const user = getUser()

    return db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .doc(albumId)
        .delete()
}