import { addAlbum, deleteAlbum, removePhotoFromAlbum } from "lib/db"
import { del } from "lib/storage"
import store from "lib/store"

export const discardPhoto = async (photo: string, album: string) => {
    store.op = { type: 'delete-album', data: album }
    store.setProgress(1)

    try {
        const count = await removePhotoFromAlbum(photo, album)
        if (!count) await del(photo)
    } catch (err) {
        console.log(err)
    } finally {
        store.setProgress(null)
    }
}

export const discardAlbum = async (album: string) => {
    store.op = { type: 'delete-album', data: album }
    store.setProgress(1)

    try {
        await deleteAlbum(album)
    } catch (err) {
        console.log(err)
    } finally {
        store.setProgress(null)
    }
}

export const createAlbum = async (album: string) => {
    store.op = { type: 'create-album' }
    store.setProgress(1)

    try {
        await addAlbum(album)
    } catch (err) {
        console.log(err)
    } finally {
        store.setProgress(null)
    }
}
