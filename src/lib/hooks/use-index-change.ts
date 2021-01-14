import db from 'lib/db'
import { withId } from 'lib/util'
import { useEffect } from 'react'
import { Index } from 'types'
import useMounted from "./use-mounted"

const useIndexChange = (userId: string | null, onUpdate: (index: Index) => void, dependencies: any[]) => {
    const mounted = useMounted()

    useEffect(() => {
        if (!userId) return

        const unsubscribe = db.collection('albums')
            .where('user', '==', userId)
            .onSnapshot(
                async snapshot => {
                    if (!mounted.current) return
                    const index = snapshot.docs.reduce<Index>((acc, doc) => {
                        return {
                            ...acc,
                            [doc.id]: withId(doc)
                        }
                    }, {})

                    onUpdate(index)
                },
                console.log
            )
        return unsubscribe
        
    }, dependencies)
}

export default useIndexChange