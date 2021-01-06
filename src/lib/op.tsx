import firebase from 'firebase/app'
import auth from './auth'
import db from './db'
import { Album } from 'types'
  
const getUser = () => {
    const user = auth.currentUser
    if (!user) throw Error('Not logged in')
    return user
}
  
export const addAlbum = (title: string) => {
    const user = getUser()

    return db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .add({ title, photos: [] })    
}
  
export const getAlbums = async () => {
    const user = getUser()

    const snapshot = await db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .get()

    return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
    })) as Album[];
}
  
export const getAlbum = (albumId: string) => {
    const user = getUser()

    return db.collection('users')
        .doc(user.uid)
        .collection('albums')
        .doc(albumId)
        .get()
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

export const getPhotos = () => {
    return firebase.storage().ref().listAll()
}

export const uploadPhoto = (file: File) => {
    const r = firebase.storage().ref()
    const c = r.child(file.name)
    return c.put(file)
}

