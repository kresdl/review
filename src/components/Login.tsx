import React from 'react'
import Input from './Input'
import { Link, useHistory } from 'react-router-dom'
import store from 'lib/store'
import { signIn } from 'lib/auth'

const Login: React.FC = () => {
  const history = useHistory()

  const login: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const { elements } = e.target as HTMLFormElement
    const { value: email } = elements.namedItem('email') as HTMLInputElement
    const { value: password } = elements.namedItem('password') as HTMLInputElement

    store.notify('Attempting to log in...')

    try {
      const cred = await signIn(email, password)
      const uid = cred.user!.uid
      sessionStorage.setItem('uid', uid)
      store.setUser(uid)
      store.notify(null)
      history.push('/user/albums')
      
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
      <Link className="d-block form-group" to="/register">Register</Link>
    </>
  )
}

export default Login