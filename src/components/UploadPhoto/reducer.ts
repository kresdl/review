import firebase from 'firebase/app'

type State = {
    file?: File | null
    progress?: number | null
    error?: firebase.storage.FirebaseStorageError | null
}

type Action = State & {
    type: 'busy' | 'end' | 'error'
}

export const reducer: React.Reducer<State, Action> = (state, { type, error, progress }) => {
    switch (type) {
        case 'busy': return { ...state, error: null, progress }
        case 'end': return {}
        case 'error': return { ...state, progress: null, error }
        default: return state
    }
}
