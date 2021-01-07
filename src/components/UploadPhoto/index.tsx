import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from '../FileInput'
import useStorage from './use-storage'
import { useOptimistic } from 'lib/hooks'
import { Photo } from 'types'
import { addPhotoToAlbum } from 'lib/db'

type Params = {
    album: string
}

const UploadPhoto: React.FC = () => {
    const { album } = useRouteMatch<Params>('/user/album/:album')!.params
    const storage = useStorage()

    const select = async (file: File) => {

        try {
            await mutation.mutate(file)
            await addPhotoToAlbum(album, file.name)
        } catch (err) {
            console.log(err)
        }
    }

    const mutation = useOptimistic(
        ['albums', album],
        (file: File) => storage.upload(file),
        (old: Photo[], file: File) => [...old, {
            url: URL.createObjectURL(file),
            name: file?.name
        }],
        [], {
        skipInvalidate: true,
        rethrow: true
    }
    )

    return (
        <div className="form-group">
            <FileInput required onPick={select} mr="0.5rem" label="Upload photo" />
            {mutation.error && <span className="text-danger">{mutation.error}</span>}
        </div>
    )
}

export default UploadPhoto 