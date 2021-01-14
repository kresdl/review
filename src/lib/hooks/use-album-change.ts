import db from 'lib/db'
import { withId } from 'lib/util'
import { useEffect } from 'react'
import { SavedAlbum } from 'types'
import useMounted from "./use-mounted"

const useAlbumChange = (id: string, onUpdate: (album: SavedAlbum) => void, dependencies: any[]) => {
    const mounted = useMounted()

    useEffect(() => {
        const unsubscribe = db.collection('albums')
            .doc(id)
            .onSnapshot(
                async doc => {
                    if (!mounted.current) return
                    const saved = withId(doc)
                    onUpdate(saved)
                },
                console.log
            )
        return unsubscribe

    }, dependencies)
}

export default useAlbumChange