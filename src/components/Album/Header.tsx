import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from './FileInput'
import store from 'lib/store'
import Progress from '../Progress'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useUpload } from 'lib/editor/hooks'
import Invite from '../Invite'

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
            <Wrapper className="d-flex align-items-center justify-content-between">
                <FileInput multiple required onPick={files => upload(files, album)} mr="0.5rem" label="Upload photo" />
                {uploading && <Progress style={{ maxWidth: 500 }} value={progress!} />}
                <Invite style={{ fontSize: '1.75rem' }}/>
            </Wrapper>
            {store.message && <span className="text-danger">{store.message}</span>}
        </div>
    )
}

export default observer(AlbumHeader)