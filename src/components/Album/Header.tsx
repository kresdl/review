import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from './FileInput'
import store from 'lib/store'
import Progress from '../Progress'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { uploadParallel } from 'lib/tools'
import Invite from '../Invite'
import closeIcon from 'images/close.svg'
import Toggle from 'components/Toggle'

const Wrapper = styled.div`
    height: 3rem;
`
const H2 = styled.h2`
    font-size: 2.25rem;
    font-weight: 100;
`

type Params = {
    album: string
}

type Props = {
    setDeleteMode: (state: boolean) => void
}

const AlbumHeader: React.FC<Props> = ({ setDeleteMode }) => {
    const { album } = useRouteMatch<Params>('/user/album/:album')!.params
    const progress = store.tasks[album]
    const uploading = typeof progress === 'number'

    return (
        <div className="form-group">
            <Wrapper className="d-flex align-items-center">
                <H2 className="mr-4">{album}</H2>
                <FileInput className="mr-4" multiple required onPick={files => uploadParallel(files, album)} label="Upload photo" />
                <Toggle className="mr-4 m" size={25} url={closeIcon} activeStyle={{ transform: 'scale(2)' }} onToggle={setDeleteMode} />
                <Invite className="mr-4" size={35} album={album}/>
                {uploading && <Progress value={progress!} />}
            </Wrapper>
            {store.message && <span className="text-danger">{store.message}</span>}
        </div>
    )
}

export default observer(AlbumHeader)