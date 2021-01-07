import React from 'react'
import Input from './Input'
import { addAlbum } from 'lib/db'
import { useOptimistic } from 'lib/hooks'
import { Album } from 'types'

const UploadAlbum: React.FC = () => {
  const mutation = useOptimistic(
    'albums',
    (title: string) => addAlbum(title),
    (old: Album[], title: string) => [...old, { 
      id: title, 
      title, 
      photos: [] 
    }],
    [],
    { rethrow: true }
  )

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const em = form.elements.namedItem('title') as HTMLInputElement
    const { value: title } = em

    try {
      await mutation.mutate(title)
      form.reset()
      em.focus()
    } catch {}
  }

  return (
    <form onSubmit={submit}>
      <Input autoFocus={false} label="Title" required />
      <button className="btn btn-primary" type="submit">Upload</button>
      {mutation.error && <span className="text-danger">{mutation.error}</span>}
    </form>
  )
}

export default UploadAlbum