import firebase from "firebase/app"
import { useReducer } from "react"
import { useMounted } from "lib/hooks"
import { reducer } from "./reducer"
import { uploadPhoto } from "lib/op"

const useAdapter = () => {
    const mounted = useMounted()
    const [{ file, progress, error }, dispatch] = useReducer(reducer, {})

    const select = (file: File) => {
        dispatch({ type: 'select', file })
    }

    const upload = () => new Promise<string>((resolve, reject) => {
        const task = uploadPhoto(file!)

        const unsubscribe = task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,

            snapshot => {
                if (!mounted.current) return
                const progress = snapshot.bytesTransferred / snapshot.totalBytes
                dispatch({ type: 'uploading', progress })
            },

            error => {
                if (mounted.current) dispatch({ type: 'error', error })
                unsubscribe()
                reject(error)
            },

            async () => {
                if (mounted.current) dispatch({ type: 'uploaded' })
                unsubscribe()
                resolve(task.snapshot.ref.fullPath)
            }
        )
    })

    return { select, upload, file, progress, error }
}

export default useAdapter