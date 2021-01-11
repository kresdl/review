import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from './FileInput'
import store from 'lib/store'
import Progress from './Progress'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useUpload } from 'lib/editor/hooks'

type Params = {
    album: string
}

const Div = styled.div`
    height: 3rem;
    display: flex;
    align-items: center;
`

const UploadPhotos: React.FC = () => {
    const { album } = useRouteMatch<Params>('/user/album/:album')!.params
    const upload = useUpload()

    return (
        <div className="form-group">
            <Div>
                <FileInput multiple required onPick={files => upload(files, album)} mr="0.5rem" label="Upload photo" />
                {store.busy && <Progress className="flex-grow-1" value={store.progress!} />}
            </Div>
            {store.message && <span className="text-danger">{store.message}</span>}
        </div>
    )
}

export default observer(UploadPhotos)