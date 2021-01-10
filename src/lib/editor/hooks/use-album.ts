import store from "lib/store"
import { inflate } from "lib/util"
import { useEffect } from "react"

const useAlbum = (album?: string) => {
    useEffect(() => {
        if (!album || !store.uid) return

        inflate(album, store.index[album])
            .then(store.setAlbum)

    }, [store.uid, album])
}

export default useAlbum