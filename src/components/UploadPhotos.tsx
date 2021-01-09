import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from './FileInput'
import { useUploadManager } from 'lib/hooks'
import { addPhotoToAlbum } from 'lib/db'
import { put } from 'lib/storage'
import store from 'lib/store'
import { toPhotoRepresentation } from 'lib/util'
import Progress from './Progress'

type Params = {
    album: string
}

const UploadPhotos: React.FC = () => {
    const { album } = useRouteMatch<Params>('/user/album/:album')!.params
    const manager = useUploadManager()

    const upload = async (files: File[]) => {
        if (!store.album) return
        const old = store.album
/*
        store.setAlbum({
            ...old,
            photos: [...old.photos, ...files.map(toPhotoRepresentation)],
        })
*/
        try {
            await Promise.all(
                files.map(
                    file => manager.upload(put(file))
                )
            )

            await Promise.all(
                files.map(file => addPhotoToAlbum(album, file.name))
            )
        } catch (err) {
            store.setAlbum(old)
            store.notify(err)
        }
    }

    const loading = typeof manager.progress === 'number'
    console.log(manager.progress)

    return (
        <div className="form-group">
            <FileInput multiple required onPick={upload} mr="0.5rem" label="Upload photo" />
            {loading && <Progress value={manager.progress!} />}
            {store.message && <span className="text-danger">{store.message}</span>}
        </div>
    )
}

export default UploadPhotos