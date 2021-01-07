import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { byTitle } from 'lib/util'
import { useQuery } from 'react-query'
import { getAlbums } from 'lib/db'
import { Album } from 'types'

const AlbumEditor: React.FC = () => {
  const albums = useQuery<Album[], Error>('albums', getAlbums)

  return (
    <div className="row">
      <div className="col-lg-6">
        <h5 className="mb-4">Create album</h5>
        <UploadAlbum />
      </div>
      <div className="col-lg-6 pt-5 pt-lg-0">
        <h5 className="mb-4">Albums</h5>
        <Albums items={albums.data?.sort(byTitle)} />
        {albums.error && <p className="text-danger">{albums.error.message}</p>}
      </div>
    </div>  
  )
}

export default AlbumEditor