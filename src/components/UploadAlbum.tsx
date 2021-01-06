import React from 'react'
import Input from './Input'
import Submit from './Submit'
import { addAlbum } from 'lib/op'
import { useQueryClient } from 'react-query'

const UploadAlbum: React.FC = () => {
  const queryClient = useQueryClient()

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const em = form.elements.namedItem('title') as HTMLInputElement
    const { value: title } = em

    try {
      await addAlbum(title)
      queryClient.invalidateQueries('albums')
      form.reset()
      em.focus()
    } catch {}
  }

  return (
    <form onSubmit={submit}>
      <Input autoFocus={false} label="Title" required />
      <Submit>Upload</Submit>
    </form>
  )
}

export default UploadAlbum