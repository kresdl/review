import React from 'react'
import { useParams } from 'react-router-dom'
import FileInput from './FileInput'
import store from 'lib/store'
import Progress from '../Progress'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { uploadParallel } from 'lib/tools'
import Invite from '../Invite'
import closeIcon from 'images/close.svg'
import Toggle from 'components/Toggle'
import { HasId } from 'types'

const activeStyle = { transform: 'scale(1.75)' }

const DeletePhoto = styled(Toggle)`
    position: relative;
    transition: transform 250ms;
    transform: translateZ(0);
`

const Wrapper = styled.div`
    height: 3rem;
`
const H2 = styled.h2`
    font-size: 2.25rem;
    font-weight: 100;
`

type Props = {
    setDeleteMode: (state: boolean) => void
}

const Header: React.FC<Props> = ({ setDeleteMode }) => {
    const { id } = useParams<HasId>()
    const title = store.index[id]?.title
    if (!title) return null

    const selectFiles = (files: File[]) => uploadParallel(files, id)

    const progress = store.tasks[id]
    const uploading = typeof progress === 'number'

    return (
        <div className="form-group">
            <Wrapper className="d-flex align-items-center">
                <H2 className="mr-4">{title}</H2>
                <FileInput className="mr-4" multiple required onPick={selectFiles} label="Upload photo" />
                <DeletePhoto className="mr-4 m" size={25} url={closeIcon} activeStyle={activeStyle} onToggle={setDeleteMode} />
                <Invite className="mr-4" size={35} albumName={title} albumId={id} />
                {uploading && <Progress value={progress!} />}
            </Wrapper>
            {store.message && <span className="text-danger">{store.message}</span>}
        </div>
    )
}

export default observer(Header)