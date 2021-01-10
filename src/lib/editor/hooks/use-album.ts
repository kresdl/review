import { getUserRef } from "lib/db"
import { get } from "lib/storage"
import store from "lib/store"
import { useEffect } from "react"
import { Album, Photo } from "types"

const inflate = async (album: Album): Promise<Album<Photo>> => ({
    ...album,
    photos: await Promise.all(album.photos.map(photo => get(photo, store.uid)))
})

const sync = (album: string, callback: (albums: Album) => void, error?: (err: Error) => void) =>
    getUserRef(store.uid!)
        .collection('albums')
        .doc(album)
        .onSnapshot(
            snapshot => {
                const data = snapshot.data() as Album
                callback(data)
            },
            error
        )

const useAlbum = (album?: string) => {
    useEffect(() => {
        if (!store.uid || !album) return

        const unsubscribe = sync(
            album,
            async data => {
                try {
                    store.setAlbum(await inflate(data))
                } catch (err) {
                    store.notify(err)
                } finally {
                    store.setBusy(false)
                }
            },
            err => {
                store.notify(err)
                store.setBusy(false)
            }
        )

        return () => void unsubscribe()
    }, [store.uid, album])
}

export default useAlbum