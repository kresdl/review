import React from 'react'
import Input from './Input'
import store from 'lib/store'
import { observer } from 'mobx-react-lite'
import { addAlbum } from 'lib/db'
import uploadSvg from 'images/cloud.svg'

const UploadAlbum: React.FC = () => {

  const submit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const em = form.elements.namedItem('title') as HTMLInputElement
    const { value: title } = em
    if (!title) return

    try {
      addAlbum(title)
      form.reset()
      em.focus()
    } catch {}
  }

  return (
    <form onSubmit={submit}>
      <Input autoComplete="off" autoFocus={false} label="Title" required />
      <input className="mr-4" type="image" width={50} src={uploadSvg} />
      {store.message && <span className="text-danger">{store.message}</span>}
    </form>
  )
}

export default observer(UploadAlbum)