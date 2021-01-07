import firebase from 'firebase/app'
import { getUser } from 'lib/auth'
import { Photo } from 'types'

export const getPhoto = async (photo: string): Promise<Photo> => {
    const user = getUser()
    const ref = firebase.storage().ref().child(user + '/' + photo)
    const url = await ref.getDownloadURL()

    return { 
        name: ref.name, 
        url 
    }
}

export const uploadPhoto = (file: File) => {
    const user = getUser()
    return firebase.storage().ref().child(user + '/' + file.name).put(file)
}

