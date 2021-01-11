import firebase from 'firebase/app'
import { Album } from 'types'
import { getUser } from './auth'
import { discardPhoto } from './editor/tools'

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

export const addPhotoToAlbum = async (photo: string, albumTitle: string) =>
    db.runTransaction(async transaction => {
        const userRef = getUserRef()

        const albumRef = userRef.collection('albums').doc(albumTitle)
        const albumDoc = await transaction.get(albumRef)
        if (!albumDoc.exists) throw Error('No album')

        const array: string[] = albumDoc.data()!.photos
        if (array.includes(photo)) throw Error('Photo exists')

        const statRef = userRef.collection('stat').doc(photo)
        const statDoc = await transaction.get(statRef)
        const count: number = statDoc.data()?.count ?? 0
        transaction.update(albumRef, { photos: [...array, photo] })
            .set(statRef, { count: count + 1 })

        return count + 1
    })

export const removePhotoFromAlbum = async (photo: string, albumTitle: string) =>
    db.runTransaction(async transaction => {
        const userRef = getUserRef()

        const albumRef = userRef.collection('albums').doc(albumTitle)
        const albumDoc = await transaction.get(albumRef)
        if (!albumDoc.exists) throw Error('No album')

        const array: string[] = albumDoc.data()!.photos
        if (!array.includes(photo)) throw Error('No photo')
        
        const statRef = userRef.collection('stat').doc(photo)
        const statDoc = await transaction.get(statRef)
        if (!statDoc.exists) throw Error('No ref count')

        transaction.update(albumRef, { photos: array.filter(e => e !== photo) })        
        const count = statDoc.data()!.count as number
        if (count > 1) transaction.set(statRef, { count: count - 1})
        else transaction.delete(statRef)

        return count - 1
    })

export const deleteAlbum = async (title: string) => {
    const userRef = getUserRef()
    const albumRef = userRef.collection('albums').doc(title)
    const albumDoc = await albumRef.get()
    if (!albumDoc.exists) throw Error('No album')

    const { photos } = albumDoc.data() as Album

    for (let photo of photos) {
        await discardPhoto(photo, title)
    }
    
    return albumRef.delete()
}