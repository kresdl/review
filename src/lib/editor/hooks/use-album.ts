import { useMounted } from "lib/hooks"
import store from "lib/store"
import { inflate } from "lib/util"
import { useEffect, useState } from "react"
import { Album, Photo } from "types"

const useAlbum = (title: string) => {
    const [album, setAlbum] = useState<Album<Photo> | undefined>()
    const mounted = useMounted()

    useEffect(() => {
        if (!title || !store.index) return

        const photos = store.index[title]
        if (!photos) return

        inflate(title, photos)
            .then(album => {
                mounted.current && setAlbum(album)
            })
    }, [store.index, title])

    return album
}

export default useAlbum