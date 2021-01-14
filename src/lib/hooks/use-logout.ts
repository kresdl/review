import auth from "lib/auth"
import store from "lib/store"
import { useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"

const useLogout = (path: string) => {
    const history = useHistory()
    const location = useLocation()
    const logout = location.pathname === path

    useEffect(
        () => () => {
            auth.signOut()
                .then(() => {
                    store.notify(null)
                    history.push('/')
                })
                .catch(store.notify)
        }, [logout]
    )
}

export default useLogout