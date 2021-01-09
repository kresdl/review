import { getAlbums, onAlbumSplice } from "lib/db"
import { useEffect } from "react"
import store from 'lib/store'

const useAlbums = (uid: string) => {
    useEffect(() => {
        getAlbums().then(store.setAlbums).catch(store.notify)
        const unsubscribe = onAlbumSplice(uid, store.setAlbums, store.notify)

        return () => void unsubscribe()
    }, [])

    return store.albums
}

export default useAlbums