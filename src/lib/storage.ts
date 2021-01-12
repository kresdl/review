import firebase from 'firebase/app'
import { getUser } from 'lib/auth'

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
