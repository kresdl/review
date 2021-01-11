import { addAlbum, deleteAlbum, removePhotoFromAlbum } from "lib/db"
import { del } from "lib/storage"
import store from "lib/store"

export const discardPhoto = async (photo: string, album: string) => {
    const update = store.getTaskControls(album)
    update(1)

    try {
        const count = await removePhotoFromAlbum(photo, album)
        if (!count) await del(photo)
    } catch (err) {
        console.log(err)
    } finally {
        update(null)
    }
}

export const discardAlbum = async (album: string) => {
    const update = store.getTaskControls(album)
    update(1)

    try {
        await deleteAlbum(album)
    } catch (err) {
        console.log(err)
    } finally {
        update(null)
    }
}

export const createAlbum = async (album: string) => {
    const update = store.getTaskControls(album)
    update(1)

    try {
        await addAlbum(album)
    } catch (err) {
        console.log(err)
    } finally {
        update(null)
    }
}
