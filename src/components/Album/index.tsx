import React from 'react'
import Header from './Header'
import { useRouteMatch } from 'react-router-dom'
import { useAlbum } from 'lib/editor/hooks'
import Photos from './Photos'
import { observer } from 'mobx-react-lite'

type Params = {
  album: string
}

const Album: React.FC = () => {
  const { album: albumTitle } = useRouteMatch<Params>('/user/album/:album')!.params
  const album = useAlbum(albumTitle)
  if (!album) return null
  const photos = album.photos

  return (
    <>
      <Header />
      <Photos album={albumTitle} photos={photos} />
    </>
  )
}

export default observer(Album)