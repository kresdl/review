import React, { useState } from 'react'
import Header from './Header'
import { useRouteMatch } from 'react-router-dom'
import { useAlbum } from 'lib/hooks'
import Photos from './Photos'
import { observer } from 'mobx-react-lite'

type Params = {
  album: string
}

const Album: React.FC = () => {
  const { album: title } = useRouteMatch<Params>('/user/album/:album')!.params
  const album = useAlbum(title)
  const [deleteMode, setDeleteMode] = useState(false)
  if (!album) return null
  const photos = album.photos

  return (
    <>
      <Header setDeleteMode={setDeleteMode} />
      <Photos {...{ photos, deleteMode }} />
    </>
  )
}

export default observer(Album)