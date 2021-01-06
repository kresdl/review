import React, { useEffect, useState, ChangeEvent } from 'react'
import Input from './Input'
import SubmitCancel from './SubmitCancel'
import { useHistory } from 'react-router-dom'
import store from 'lib/store'
import firebase from 'firebase/app'
import db from 'lib/db'

const Register: React.FC = () => {
  useEffect(store.notify, [])

  const [pwSync, setPwSync] = useState(true)
  const history = useHistory<string>()

  const cancel = () => {
    store.notify(null)
    history.push('/')
  }

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    if (!pwSync) return store.notify('Password mismatch')

    const { elements } = e.target as HTMLFormElement
    const { value: name } = elements.namedItem('first-name') as HTMLInputElement
    const { value: lastName } = elements.namedItem('last-name') as HTMLInputElement
    const { value: email } = elements.namedItem('email') as HTMLInputElement
    const { value: password } = elements.namedItem('password') as HTMLInputElement

    store.notify('Registering...')

    try {
      const cred = await firebase.auth().createUserWithEmailAndPassword(email, password)
      await db.collection('users').doc(cred.user!.uid).set({ name, lastName, email })
      store.notify('Register successful!')
      history.push('/')
    } catch (err) {
      store.notify(err)
    }
  }

  const pwProps = {
    autoComplete: 'off',
    required: true,
    type: 'password',
    invalid: !pwSync,

    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const { elements } = e.target.form!,
        { value: pw } = elements.namedItem('password') as HTMLInputElement,
        { value: repeatPw } = elements.namedItem('repeat-password') as HTMLInputElement
      setPwSync(pw === repeatPw)
    }
  }

  return (
    <form onSubmit={submit}>
      <Input autoComplete="off" required name="first-name" label="First name" />
      <Input autoComplete="off" required name="last-name" label="Last name" />
      <Input autoComplete="off" required type="email" name="email" label="Email" />
      <Input {...pwProps} autoComplete="off" required name="password" label="Password (6 characters minimum)" pattern=".{6,}" />
      <Input {...pwProps} autoComplete="off" required label="Repeat password" />
      <SubmitCancel ok="Register" onCancel={cancel} />
    </form>
  )
}

export default Register