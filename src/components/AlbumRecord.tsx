import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { discardAlbum } from 'lib/editor/tools'
import Progress from './Progress'
import store from 'lib/store'
import tap from 'tap'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const Div = styled.div`
  margin-bottom: -1px
`

type Props = {
  title: string
}

const AlbumRecord: React.FC<Props> = ({ title }) => (
  <Div className="d-flex align-items-center p-3 border rounded">
    {
      store.busy
      ? <Progress className="flex-grow-1" value={store.progress!} />
      : <>
          <Link to={`/user/album/${title}`}>
            <H2 className="mb-1">{title}</H2>
          </Link>
          <button className="close ml-auto" onClick={() => discardAlbum(title)}>&times;</button>
        </>
    }
  </Div>
)

export default observer(AlbumRecord)