import React from 'react'
import Input from './Input'
import Submit from './Submit'
import { Link } from 'react-router-dom'
import store from 'lib/store'
import auth from 'lib/auth'

const Login: React.FC = () => {

  const login: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const { elements } = e.target as HTMLFormElement
    const { value: email } = elements.namedItem('email') as HTMLInputElement
    const { value: password } = elements.namedItem('password') as HTMLInputElement

    store.notify('Attempting to log in...')
    auth.signInWithEmailAndPassword(email, password).catch(store.notify)
  }

  return (
    <>
      <form onSubmit={login}>
        <Input type="email" required name="email" label="Email" autoComplete="on"/>
        <Input type="password" required name="password" label="Password" autoComplete="on"/>
        <Submit>Login</Submit>
      </form>
      <Link className="d-block form-group" to="/register">Register</Link>
    </>
  )
}

export default Login