import firebase from 'firebase/app'
const auth = firebase.auth()

export default auth

export const getUser = () => {
    const user = auth.currentUser
    if (!user) throw Error('Not logged in')
    return user
}
