import React from 'react'
import { Album } from 'types'
import styled from '@emotion/styled'
import { deleteAlbum } from 'lib/db'
import { useOptimistic } from 'lib/hooks'
import { Link } from 'react-router-dom'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const Div = styled.div`
  margin-bottom: -1px
`

const AlbumRecord: React.FC<Album> = ({ title }) => {

  const discard = useOptimistic(
    'albums',
    () => deleteAlbum(title),
    (old: Album[]) => old.filter(album => album.title !== title),
    []
  )

  return (
    <Div className="d-flex align-items-center p-3 border rounded">
      <Link to={`/user/album/${title}`}>
        <H2 className="mb-1">{title}</H2>
      </Link>
      <button className="close ml-auto" onClick={discard}>&times;</button>
    </Div>
  )
}

export default AlbumRecord