import auth from "lib/auth"
import { useEffect } from "react"
import { User } from 'types'

const useAuthChange = (onAuthChange: (user: User | null) => void, dependencies: any[]) => {
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            const usr = user && {
                uid: user.uid,
                email: user.email!,
            }
            onAuthChange(usr)
        })        
    }, dependencies)
}

export default useAuthChange