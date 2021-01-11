import React from 'react'
import Input from './Input'
import store from 'lib/store'
import { observer } from 'mobx-react-lite'
import { addAlbum } from 'lib/db'

const UploadAlbum: React.FC = () => {

  const submit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const em = form.elements.namedItem('title') as HTMLInputElement
    const { value: title } = em

    try {
      addAlbum(title)
      form.reset()
      em.focus()
    } catch {}
  }

  return (
    <form onSubmit={submit}>
      <Input autoComplete="off" autoFocus={false} label="Title" required />
      <button className="btn btn-primary" disabled={store.busy} type="submit">Upload</button>
      {store.message && <span className="text-danger">{store.message}</span>}
    </form>
  )
}

export default observer(UploadAlbum)