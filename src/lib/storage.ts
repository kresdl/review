import firebase from 'firebase/app'
import { getUser } from 'lib/auth'
import { Photo } from 'types'

export const get = async (name: string): Promise<Photo> => {
    const ref = firebase.storage()
        .ref()
        .child(getUser().uid + '/' + name)

    return { 
        name: ref.name, 
        url: await ref.getDownloadURL()
    }
}

export const put = (file: File) =>
    firebase.storage()
        .ref()
        .child(getUser().uid + '/' + file.name)
        .put(file)

export const del = (name: string) =>
    firebase.storage()
        .ref()
        .child(getUser().uid + '/' + name)
        .delete()
