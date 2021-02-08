import auth from "lib/auth"
import store from "lib/store"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useLogout = (path: string) => {
    const location = useLocation()
    const logout = location.pathname === path

    useEffect(
        () => () => void auth.signOut().catch(store.notify), 
        [logout]
    )
}

export default useLogout