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
  id: string
}

const AlbumRecord: React.FC<Props> = ({ title, id }) => {
  const [editing, setEditing] = useState(false)
  if (!store.index) return null
  
  const progress = store.tasks[id]
  const uploading = typeof progress === 'number'

  const accept = (text: string) => {
    renameAlbum(id, text)
    setEditing(false)
  }

  const edit = () => setEditing(true)
  const cancel = () => setEditing(false)

  return (
    <Wrapper className="d-flex align-items-center px-3 border rounded">
      {
        editing
          ? <Edit onAccept={accept} onCancel={cancel} initial={title} />
          : <>
              <Link className="mr-2" to={`/user/album/${id}`}>
                <H2 className="mb-0">{title}</H2>
              </Link>
              <ImageButton className="mr-2" size={20} url={pencilSvg} onClick={edit} />
            </>
      }
      {uploading && <Progress className="mr-3" value={progress!} />}
      <Invite className="ml-auto" size={22} album={title} />
      <button className="close" onClick={() => discardAlbum(id)}>&times;</button>
    </Wrapper >
  )
}

export default observer(AlbumRecord)