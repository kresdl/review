import { addAlbum, deleteAlbum, removePhotoFromAlbum } from "lib/db"
import { del } from "lib/storage"
import store from "lib/store"

export const discardPhoto = async (photo: string, album: string) => {
    if (store.busy) return
    store.setBusy(true)
    const count = await removePhotoFromAlbum(album, photo)

    try {
        if (!count) await del(photo)

    } catch (err) {
        store.notify(err)
        throw err
    }
}

export const discardAlbum = async (album: string) => {
    if (store.busy) return
    store.setBusy(true)
    const toDelete = await deleteAlbum(album)

    try {
        await Promise.all(toDelete.map(del))

    } catch (err) {
        store.notify(err)
        throw err
    }
}

export const createAlbum = async (album: string) => {
    if (store.busy) return
    store.setBusy(true)
    return addAlbum(album)
}
