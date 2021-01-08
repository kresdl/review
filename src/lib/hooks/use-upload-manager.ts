import firebase from 'firebase/app'
import { useCallback, useReducer } from 'react'
import useMounted from './use-mounted'

type State = {
    file?: File | null
    progress?: number | null
    error?: firebase.storage.FirebaseStorageError | null
}

type Action = State & {
    type: 'busy' | 'end' | 'error'
}

const reducer: React.Reducer<State, Action> = (state, { type, error, progress }) => {
    switch (type) {
        case 'busy': return { ...state, error: null, progress }
        case 'end': return {}
        case 'error': return { ...state, progress: null, error }
        default: return state
    }
}

const useUploadManager = () => {
    const mounted = useMounted()
    const [{ progress, error }, dispatch] = useReducer(reducer, {})

    const upload = useCallback(
        (task : firebase.storage.UploadTask) => new Promise<void>((resolve, reject) => {
            const unsubscribe = task.on(
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

export default useUploadManager