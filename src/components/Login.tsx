import React from 'react'
import Input from './Input'
import { Link, useHistory } from 'react-router-dom'
import store from 'lib/store'
import auth from 'lib/auth'

const Login: React.FC = () => {
    const history = useHistory()

    const login: React.FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        const { elements } = e.target as HTMLFormElement
        const { value: email } = elements.namedItem('email') as HTMLInputElement
        const { value: password } = elements.namedItem('password') as HTMLInputElement

        store.notify('Attempting to log in...')

        try {
            await auth.signInWithEmailAndPassword(email, password)
            store.notify(null)
            history.push('/albums')

        } catch (err) {
            store.notify(err)
        }
    }

    return (
        <>
            <form onSubmit={login}>
                <Input type="email" required name="email" label="Email" autoComplete="on" />
                <Input type="password" required name="password" label="Password" autoComplete="on" />
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <Link className="d-block form-group mt-2" to="/register">Register</Link>
        </>
    )
}

export default Login