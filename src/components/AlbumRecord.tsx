import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { discardAlbum } from 'lib/tools'
import Progress from './Progress'
import store from 'lib/store'
import Invite from './Invite'
import ImageButton from './ImageButton'
import pencilSvg from 'images/pencil.svg'
import Edit from './Edit'
import { renameAlbum } from 'lib/db'

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
  const [editing, setEditing] = useState(false)

  const accept = (text: string) => {
    renameAlbum(title, text)
    setEditing(false)
  }

  const edit = () => setEditing(true)
  const cancel = () => setEditing(false)

  return (
    <Wrapper className="d-flex align-items-center px-3 border rounded">
      {
        editing
          ? <Edit onAccept={accept} onCancel={cancel}/>
          : <>
              <Link className="mr-2" to={`/user/album/${title}`}>
                <H2 className="mb-0">{title}</H2>
              </Link>
              <ImageButton size={20} url={pencilSvg} onClick={edit}/>
            </>
      }
      {uploading && <Progress className="mr-3" value={progress!} />}
      <Invite className="ml-auto" size={22} album={title} />
      <button className="close" onClick={() => discardAlbum(title)}>&times;</button>
    </Wrapper >
  )
}

export default observer(AlbumRecord)