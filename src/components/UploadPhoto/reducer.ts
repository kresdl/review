import firebase from 'firebase/app'

type State = {
    file?: File | null
    progress?: number | null
    error?: firebase.storage.FirebaseStorageError | null
}
  
type Action = State & {
    type: 'select' | 'uploading' | 'uploaded' | 'error'
}
  
export const reducer: React.Reducer<State, Action> = (state, { type, file, error, progress }) => {
    switch (type) {
        case 'select': return { file }
        case 'uploading': return { ...state, error: null, progress }
        case 'uploaded': return {}
        case 'error': return { ...state, progress: null, error }
        default: return state
    }
}
