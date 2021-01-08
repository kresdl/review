import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from './FileInput'
import { useUploadManager, useOptimistic } from 'lib/hooks'
import { Photo } from 'types'
import { addPhotoToAlbum } from 'lib/db'
import { put } from 'lib/storage'

type Params = {
    album: string
}

const UploadPhotos: React.FC = () => {
    const { album } = useRouteMatch<Params>('/user/album/:album')!.params
    const manager = useUploadManager()

    const select = async (files: File[]) => {
        try {
            await mutation.mutate(files)
            await Promise.all(
                files.map(file => addPhotoToAlbum(album, file.name))
            )
        } catch (err) {
            console.log(err)
        }
    }

    const mutation = useOptimistic(
        ['albums', album],
        {
            asyncFn: (files: File[]) =>
                Promise.all(
                    files.map(
                        file => manager.upload(put(file))
                    )
                ),

            optimisticFn: (old: Photo[], files: File[]) =>
                [
                    ...old,
                    ...files.map(file => ({
                        url: URL.createObjectURL(file),
                        name: file?.name
                    }))
                ],
                
            opt: { skipInvalidate: true },
        }, []
    )

    return (
        <div className="form-group">
            <FileInput multiple required onPick={select} mr="0.5rem" label="Upload photo" />
            {mutation.error && <span className="text-danger">{mutation.error}</span>}
        </div>
    )
}

export default UploadPhotos