import firebase from 'firebase/app'
const auth = firebase.auth()

export default auth

export const getUser = () => {
    const user = auth.currentUser
    if (!user) throw Error('Not logged in')
    return user
}

export const register = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password)

export const signIn = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password)
