import firebase from 'firebase/app'
import { addPhotoToAlbum } from "lib/db"
import { put } from "lib/storage"
import store from "lib/store"
import { useCallback } from 'react'

const useManager = () =>
    useCallback(
        (task: firebase.storage.UploadTask, current: number, total: number) => new Promise<void>((resolve, reject) => {
            const unsubscribe = task.on(
                firebase.storage.TaskEvent.STATE_CHANGED,

                snapshot => {
                    store.setProgress(current / total + (snapshot.bytesTransferred / snapshot.totalBytes) / total)
                },

                error => {
                    unsubscribe()
                    reject(error)
                },

                () => {
                    unsubscribe()
                    resolve()
                }
            )
        }),
        []
    )

const useUpload = () => {
    const upload = useManager()

    return async (files: File[], album: string) => {
        store.op = { type: 'upload' }
        store.setProgress(0)
        let i = 0

        try {
            for (let file of files) {
                await upload(put(file), i++, files.length)
                await addPhotoToAlbum(file.name, album)
            }
            store.setProgress(1)
            setTimeout(() => store.setProgress(null), 500)
        } catch (err) {
            console.log(err)
            store.setProgress(null)
        }
    }
}

export default useUpload