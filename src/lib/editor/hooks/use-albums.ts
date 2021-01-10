import { getUserRef } from "lib/db"
import { useEffect } from "react"
import store from 'lib/store'
import { Album } from "types"

const sync = (callback: (albums: Album[]) => void, error?: (err: Error) => void) => 
    getUserRef(store.uid!)
        .collection('albums')
        .onSnapshot(
            snapshot => {
                const data = snapshot.docs.map(doc => doc.data() as Album)
                callback(data)
            },
            error
        )

const useAlbums = () => {
    useEffect(() => {
        if (!store.uid) return
        const unsubscribe = sync(
            data => {
                store.setAlbums(data)
                store.setBusy(false)
            },
            err => {
                store.notify(err)
                store.setBusy(false)
            }
        )
        return () => void unsubscribe()
    }, [store.uid])
}

export default useAlbums