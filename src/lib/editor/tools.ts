import { deleteAlbum, removePhotoFromAlbum } from "lib/db"
import { del } from "lib/storage"
import store from "lib/store"

export const discardPhoto = async (photo: string, album: string) => {
    try {
        const count = await removePhotoFromAlbum(album, photo)
        if (!count) await del(photo)

    } catch (err) {
        store.notify(err)
    }
}

export const discardAlbum = async (album: string) => {    
    try {
        const toDelete = await deleteAlbum(album)
        await Promise.all(toDelete.map(del))

    } catch (err) {
        store.notify(err)
        throw err
    }
}