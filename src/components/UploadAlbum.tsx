import React from 'react'
import Input from './Input'
import Submit from './Submit'
import { addAlbum } from 'lib/db'
import { useQueryClient } from 'react-query'
import { useOptimistic } from 'lib/hooks'
import { Album } from 'types'

const UploadAlbum: React.FC = () => {
  const queryClient = useQueryClient()
  const add = useOptimistic(
    'albums',
    (title: string) => addAlbum(title),
    (old: Album[], title: string) => [...old, { id: title, title }],
    []
  )

  const submit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const em = form.elements.namedItem('title') as HTMLInputElement
    const { value: title } = em

    try {
      await add(title)
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