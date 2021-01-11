import firebase from 'firebase/app'
import { addPhotoToAlbum } from "lib/db"
import { put } from "lib/storage"
import store from "lib/store"
import { useCallback } from 'react'

const useManager = () =>
    useCallback(
        (task: firebase.storage.UploadTask, current: number, total: number, onProgress: (progress: number) => void) => new Promise<void>((resolve, reject) => {
            const unsubscribe = task.on(
                firebase.storage.TaskEvent.STATE_CHANGED,

                snapshot => {
                    const progress = current / total + (snapshot.bytesTransferred / snapshot.totalBytes) / total
                    onProgress(progress)
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
        const update = store.getTaskControls(album)
        update(0)
        let i = 0

        try {
            for (let file of files) {
                await upload(put(file), i++, files.length, update)
                await addPhotoToAlbum(file.name, album)
            }
            update(1)
            setTimeout(() => update(null), 500)
        } catch (err) {
            console.log(err)
            update(null)
        }
    }
}

export default useUpload