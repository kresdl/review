import React from 'react'
import { Album } from 'types'
import styled from '@emotion/styled'
import { deleteAlbum } from 'lib/op'
import { useOptimistic } from 'lib/hooks'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const Div = styled.div`
  margin-bottom: -1px
`

const AlbumRecord: React.FC<Album> = ({ id, title }) => {

  const discard = useOptimistic(
    'albums',
    () => deleteAlbum(id),
    (old: Album[]) => old.filter(album => album.id !== id),
    []
  )

  return (
    <Div className="d-flex align-items-center p-3 border rounded">
      <H2 className="mb-1">{title}</H2>
      <button className="close ml-auto" onClick={discard}>&times;</button>
    </Div>
  )
}

export default AlbumRecord