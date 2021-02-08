import { useEffect } from "react"
import auth from "lib/auth"

const useCatchGuest = () => {
    useEffect(() => {
        if (auth.isSignInWithEmailLink(window.location.href)) {
            const email = window.prompt('Ange din email-adress för verifikation')
            if (email) {
                auth.signInWithEmailLink(email, window.location.href).catch(alert)
            }
        }
    }, [])
}

export default useCatchGuest