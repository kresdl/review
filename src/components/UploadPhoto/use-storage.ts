import firebase from "firebase/app"
import { useCallback, useReducer } from "react"
import { useMounted } from "lib/hooks"
import { reducer } from "./reducer"
import { put } from 'lib/storage'

const useStorage = () => {
    const mounted = useMounted()
    const [{ progress, error }, dispatch] = useReducer(reducer, {})

    const upload = useCallback(
        (file: File) => new Promise<void>((resolve, reject) => {
            const unsubscribe = put(file!).on(
                firebase.storage.TaskEvent.STATE_CHANGED,

                snapshot => {
                    if (!mounted.current) return
                    const progress = snapshot.bytesTransferred / snapshot.totalBytes
                    dispatch({ type: 'busy', progress })
                },

                error => {
                    if (mounted.current) dispatch({ type: 'error', error })
                    unsubscribe()
                    reject(error)
                },

                () => {
                    if (mounted.current) dispatch({ type: 'end' })
                    unsubscribe()
                    resolve()
                }
            )
        }),
        []
    )

    return { upload, progress, error }
}

export default useStorage