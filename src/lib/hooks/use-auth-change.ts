import auth from "lib/auth"
import { useEffect } from "react"
import { Role, User } from 'types'

const useAuthChange = (onAuthChange: (user: User | null) => void, dependencies: any[]) => {
    let role: Role = 'user'

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            const usr = user && {
                uid: user.uid,
                email: user.email!,
                role
            }
            onAuthChange(usr)
        })

        if (auth.isSignInWithEmailLink(window.location.href)) {
            const email = window.prompt('Ange din email-adress för verifikation');
            if (!email) return
            role = 'guest'

            auth.signInWithEmailLink(email, window.location.href)
                .then(console.log)
                .catch(alert);
        }
    }, dependencies)
}

export default useAuthChange