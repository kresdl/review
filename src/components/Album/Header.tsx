import React from 'react'
import { useParams } from 'react-router-dom'
import FileInput from './FileInput'
import store from 'lib/store'
import Progress from '../Progress'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { discardPhotos, uploadParallel } from 'lib/tools'
import Invite from '../Invite'
import closeIcon from 'images/close.svg'
import albumIcon from 'images/photo-album.svg'
import { HasId } from 'types'
import ImageButton from 'components/ImageButton'
import { clonePhotos } from 'lib/db'

const Wrapper = styled.div`
    height: 3rem;
`
const H2 = styled.h2`
    font-size: 2.25rem;
    font-weight: 100;
`

type Props = {
    selection: React.MutableRefObject<string[]>
}

const Header: React.FC<Props> = ({ selection }) => {
    const { id } = useParams<HasId>()
    const title = store.index[id]?.title
    if (!title) return null

    const selectFiles = (files: File[]) => uploadParallel(files, id)

    const discard = () => {
        discardPhotos(selection.current, id).catch(console.error)
    }

    const clone = () => {
        const album = store.index[id]
        const selected = album.photos.filter(p => selection.current.includes(p.name))
        const albumName = prompt("Album name")
        if (!albumName) return
        clonePhotos(selected, albumName).catch(console.error)
    }

    const progress = store.tasks[id]
    const uploading = typeof progress === 'number'

    return (
        <div className="form-group">
            <Wrapper className="d-flex align-items-center">
                <H2 className="mr-4">{title}</H2>
                <FileInput className="mr-4" multiple required onPick={selectFiles} label="Upload photo" />
                <ImageButton className="mr-4 m" imageSize={25} url={closeIcon} onClick={discard}/>
                <ImageButton className="mr-4 m" imageSize={35} url={albumIcon} onClick={clone}/>
                <Invite className="mr-4" size={35} albumName={title} albumId={id} />
                {uploading && <Progress value={progress!} />}
            </Wrapper>
            {store.message && <span className="text-danger">{store.message}</span>}
        </div>
    )
}

export default observer(Header)