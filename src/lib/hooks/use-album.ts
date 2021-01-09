import { getAlbum, onAlbumEdit } from "lib/db"
import { get } from "lib/storage"
import store from "lib/store"
import { useEffect } from "react"
import { Album, Photo } from "types"

const expand = async (album: Album): Promise<Album<Photo>> => ({
    ...album,
    photos: await Promise.all(album.photos.map(get))
})

const useAlbum = (uid: string, albumTitle: string) => {
    useEffect(() => {

        getAlbum(albumTitle).then(
            async album => store.setAlbum(await expand(album))
        ).catch(store.notify)

        const unsubscribe = onAlbumEdit(uid, albumTitle, 
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

    return store.album
}

export default useAlbum