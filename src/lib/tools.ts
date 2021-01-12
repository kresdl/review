import { addAlbum, removeAlbum, prepareAddPhoto, removePhotoFromAlbum } from "lib/db"
import { del } from "lib/storage"
import firebase from 'firebase/app'
import { put } from "lib/storage"
import store from "lib/store"

const upload = (task: firebase.storage.UploadTask, onProgress: (progress: number) => void) => new Promise<string>((resolve, reject) => {
    const unsubscribe = task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,

        snapshot => {
            onProgress(snapshot.bytesTransferred / snapshot.totalBytes)
        },

        error => {
            unsubscribe()
            reject(error)
        },

        async () => {
            unsubscribe()
            const url = await task.snapshot.ref.getDownloadURL() as string
            resolve(url)
        }
    )
})

export const uploadParallel = async (files: File[], albumId: string) => {
    const updateProgress = store.getTaskControls(albumId)
    updateProgress(0)

    let fragments = [...Array(files.length)].fill(0)

    try {
        const add = await prepareAddPhoto(albumId)

        await Promise.all(
            files.map(async (file, i) => {
                try {
                    const url = await upload(
                        put(file),
                        frag => {
                            fragments[i] = frag
                            const progress = fragments.reduce((sum, p) => sum + p, 0) / files.length
                            updateProgress(progress)
                        })
                    add(file.name, url)
                } catch (err) {
                    console.log(err)
                }
            })
        )
    } catch (err) {
        console.log(err)
    } finally {
        updateProgress(null)
    }
}

export const discardPhoto = async (photo: string, albumId: string) => {
    const update = store.getTaskControls(albumId)
    update(1)

    try {
        const count = await removePhotoFromAlbum(photo, albumId)
        update(null)
        if (!count) await del(photo)
    } catch (err) {
        update(null)
        console.log(err)
    }
}

export const discardAlbum = async (id: string) => {
    const update = store.getTaskControls(id)
    update(1)

    try {
        const toDelete = await removeAlbum(id)
        update(null)
        await Promise.all(toDelete.map(del))
    } catch (err) {
        update(null)
        console.log(err)
    }
}

export const createAlbum = async (album: string) => {
    try {
        await addAlbum(album)
    } catch (err) {
        console.log(err)
    }
}
