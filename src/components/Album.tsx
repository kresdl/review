import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { byTitle } from 'lib/util'
import { useQuery } from 'react-query'
import { getAlbums } from 'lib/db'
import UploadPhoto from './UploadPhoto'
import { useRouteMatch } from 'react-router-dom'
import { getPhoto } from 'lib/storage'
import { getAlbum } from  'lib/db'
import styled from '@emotion/styled'
import Thumbnail from './Thumbnail'

type Params = {
  album: string
}

const Album: React.FC = () => {
  const { album } = useRouteMatch<Params>('/user/album/:album')!.params

  const photos = useQuery(['albums', album], async () => {
    const { photos } = await getAlbum(album)
    const urls = await Promise.all(photos.map(getPhoto))
    return urls
  })

  return (
    <>
      <UploadPhoto />
      <div className="d-flex">
        {
          photos.data?.map(url => (
            <Thumbnail key={url} url={url} />
          ))
        }
      </div>
    </>
  )
}

export default Album