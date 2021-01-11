import firebase from 'firebase/app'
import { getUser } from 'lib/auth'

export const get = async (name: string, uid?: string | null): Promise<string> => {
    const ref = firebase.storage()
        .ref()
        .child((uid || getUser().uid) + '/' + name)

    return ref.getDownloadURL()
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
