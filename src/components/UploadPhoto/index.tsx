import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from '../FileInput'
import ProgressBar from '../ProgressBar'
import useAdapter from './use-adapter'
import { useOptimistic } from 'lib/hooks'
import { Photo } from 'types'
import { addPhotoToAlbum } from 'lib/db'

type Params = {
  album: string
}

const UploadPhoto: React.FC = () => {
  const { album } = useRouteMatch<Params>('/user/album/:album')!.params
  const { upload, progress, error } = useAdapter()

  const select = async (file: File) => {
    try {
      const path = await store(file)
      await addPhotoToAlbum(album, path)

    } catch (err) {
      console.log(err)
    }
  }

  const store = useOptimistic(
    ['albums', album],
    (file: File) => upload(file),
    (old: Photo[], file: File) => {
      const temp = {
        url: URL.createObjectURL(file),
        path: file?.name
      }

      return [...old, temp]
    },
    []
  )

  const uploading = typeof progress === 'number'

  return (
    <>
      <FileInput required onPick={select} />
      {error && <p>{error.message}</p>}
    </>
  )
}

export default UploadPhoto 