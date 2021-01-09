import { onAlbumEdit } from "lib/db"
import { get } from "lib/storage"
import store from "lib/store"
import { useEffect } from "react"
import { Album, Photo } from "types"

const expand = async (album: Album, uid?: string): Promise<Album<Photo>> => ({
    ...album,
    photos: await Promise.all(album.photos.map(photo => get(photo, uid)))
})

const useAlbum = (albumTitle?: string, uid?: string | null) => {
    useEffect(() => {
        if (!uid || !albumTitle) return

        const unsubscribe = onAlbumEdit(albumTitle, uid, 
            async album => {
                try {
                    store.setAlbum(await expand(album))
                } catch (err) {
                    store.notify(err)
                }
            },
            store.notify
        )

        return () => void unsubscribe()
    }, [])
}

export default useAlbum