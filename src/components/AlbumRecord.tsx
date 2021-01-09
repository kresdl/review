import React from 'react'
import { Album } from 'types'
import styled from '@emotion/styled'
import { deleteAlbum } from 'lib/db'
import { del } from 'lib/storage'
import { Link } from 'react-router-dom'
import store from 'lib/store'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const Div = styled.div`
  margin-bottom: -1px
`

const AlbumRecord: React.FC<Album> = ({ title, dummy }) => {

  const discard = async () => {
    if (dummy) return
    
    const old = store.albums
    store.setAlbums(old.filter(album => album.title !== title))

    try {
      const toDelete = await deleteAlbum(title)
      await Promise.all(toDelete.map(del))

    } catch (err) {
      store.setAlbums(old)
      store.notify(err)
    }
  }

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