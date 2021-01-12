import { useEffect, useState } from "react"
import store from 'lib/store'
import { Album } from "types"

const useAlbum = (title: string) => {
    const [album, setAlbum] = useState<Album | undefined>()

    useEffect(() => {
        if (!title || !store.index) return

        const photos = store.index[title]
        if (!photos) return

        setAlbum({ title, photos })
    }, [store.index, title])

    return album
}

export default useAlbum