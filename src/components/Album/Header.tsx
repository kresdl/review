import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from './FileInput'
import store from 'lib/store'
import Progress from '../Progress'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useUpload } from 'lib/editor/hooks'
import Invite from '../Invite'
import closeIcon from 'images/close.svg'
import Toggle from 'components/Toggle'

type Params = {
    album: string
}

const Wrapper = styled.div`
    height: 3rem;
`

const AlbumHeader: React.FC = () => {
    const { album } = useRouteMatch<Params>('/user/album/:album')!.params
    const upload = useUpload()
    const progress = store.tasks[album]
    const uploading = typeof progress === 'number'

    return (
        <div className="form-group">
            <Wrapper className="d-flex align-items-center">
                <FileInput className="mr-4" multiple required onPick={files => upload(files, album)} label="Upload photo" />
                <Toggle className="mr-4 m" size={25} url={closeIcon} activeStyle={{ transform: 'scale(2)' }} onToggle={state => store.deleteMode = state} />
                <Invite className="mr-4" size={35} album={album}/>
                {uploading && <Progress value={progress!} />}
            </Wrapper>
            {store.message && <span className="text-danger">{store.message}</span>}
        </div>
    )
}

export default observer(AlbumHeader)