import firebase from 'firebase/app'
import { addPhotoToAlbum } from "lib/db"
import { put } from "lib/storage"
import store from "lib/store"
import { useCallback } from 'react'

const useManager = () => 
    useCallback(
        (task : firebase.storage.UploadTask) => new Promise<void>((resolve, reject) => {
            const unsubscribe = task.on(
                firebase.storage.TaskEvent.STATE_CHANGED,

                snapshot => {
                    store.setProgress(snapshot.bytesTransferred / snapshot.totalBytes)
                },

                error => {
                    store.setProgress(null)
                    unsubscribe()
                    reject(error)
                },

                () => {
                    store.setProgress(null)
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
        if (store.busy) return

        try {
            for (let file of files) {
                store.setBusy(true)
                await upload(put(file))
                addPhotoToAlbum(album, file.name)
            }
        } catch (err) {
            store.notify(err)
            throw err
        }
    }
}

export default useUpload