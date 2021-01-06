import firebase from 'firebase/app'
import { getUser } from 'lib/auth'

export const getPhoto = async (photo: string) => {
    const user = getUser()
    return firebase.storage().ref().child(user + '/' + photo).getDownloadURL()
}
export const uploadPhoto = (file: File) => {
    const user = getUser()
    return firebase.storage().ref().child(user + '/' + file.name).put(file)
}

