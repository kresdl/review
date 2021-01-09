import { onAlbumSplice } from "lib/db"
import { useEffect } from "react"
import store from 'lib/store'

const useAlbums = (uid?: string | null) => {
    useEffect(() => {
        if (!uid) return
        const unsubscribe = onAlbumSplice(uid, store.setAlbums, store.notify)
        return () => void unsubscribe()
    }, [])
}

export default useAlbums