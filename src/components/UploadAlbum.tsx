import React from 'react'
import Input from './Input'
import { addAlbum } from 'lib/db'
import store from 'lib/store'

const UploadAlbum: React.FC = () => {

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const em = form.elements.namedItem('title') as HTMLInputElement
    const { value: title } = em

    const old = store.albums
/*
    store.setAlbums([...old, {
      id: title,
      title,
      photos: [],
      dummy: true
    }])
*/
    try {
      await addAlbum(title)
      form.reset()
      em.focus()

    } catch (err) {
      store.setAlbums(old)
      store.notify(err)
    }
  }

  return (
    <form onSubmit={submit}>
      <Input autoComplete="off" autoFocus={false} label="Title" required />
      <button className="btn btn-primary" type="submit">Upload</button>
      {store.message && <span className="text-danger">{store.message}</span>}
    </form>
  )
}

export default UploadAlbum