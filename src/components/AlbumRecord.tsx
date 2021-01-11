import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { discardAlbum } from 'lib/editor/tools'
import Progress from './Progress'
import store from 'lib/store'
import Invite from './Invite'

const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`

const Wrapper = styled.div`
  margin-bottom: -1px;
  height: 4rem;
`

type Props = {
  title: string
}

const AlbumRecord: React.FC<Props> = ({ title }) => {
  const progress = store.tasks[title]
  const uploading = typeof progress === 'number'

  return (
    <Wrapper className="d-flex align-items-center px-3 border rounded">
      <Link to={`/user/album/${title}`}>
        <H2 className="mb-0 mr-3">{title}</H2>
      </Link>
      {uploading && <Progress className="mr-3" value={progress!} />}
      <Invite size={22} style={{ fontSize: '1.25rem', marginLeft: 'auto' }} album={title} />
      <button className="close" onClick={() => discardAlbum(title)}>&times;</button>
    </Wrapper>
  )
}

export default observer(AlbumRecord)