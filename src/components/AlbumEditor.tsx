import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import { byTitle } from 'lib/util'
import { useQuery } from 'react-query'
import { getAlbums } from 'lib/op'
import { Album } from 'types'

const AlbumEditor: React.FC = () => {
  const albums = useQuery<Album[], Error>('albums', getAlbums)

  return (
    <div className="row">
      <div className="col-lg-6">
        <h5 className="mb-4">
          <span>Upload album</span>
          <small className="float-right text-secondary">
            {/*add.error?.message*/}
          </small>
        </h5>
        <UploadAlbum />
      </div>
      <div className="col-lg-6 pt-5 pt-lg-0">
        <h5 className="mb-4">
          <span>Albums</span>
          <small className="float-right text-secondary">
            {/*
              albums.error?.message || deleteErr?.message
              || (!albums.data?.length && 'No albums')
            */}
          </small>
        </h5>
        <Albums items={albums.data?.sort(byTitle)} />
      </div>
    </div>
  )
}

export default AlbumEditor