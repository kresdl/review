import firebase from 'firebase/app'
import auth from "lib/auth"
import { useEffect } from "react"

const useAuthChange = (callback: (user: firebase.User | null) => void, dependencies: any[]) => {
    useEffect(
        () => {
            const unsubscribe = auth.onAuthStateChanged(callback)
            return () => void unsubscribe()
        }, dependencies
    )
}

export default useAuthChange