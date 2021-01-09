import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import FileInput from './FileInput'
import { useUploadManager } from 'lib/hooks'
import { addPhotoToAlbum } from 'lib/db'
import { put } from 'lib/storage'
import store from 'lib/store'
import { Photo } from 'types'

type Params = {
    album: string
}

const toPhoto = (file: File): Photo => ({
    url: URL.createObjectURL(file),
    name: file?.name
})

const UploadPhotos: React.FC = () => {
    const { album } = useRouteMatch<Params>('/user/album/:album')!.params
    const manager = useUploadManager()

    const select = async (files: File[]) => {
        const old = store.album!

        store.setAlbum({
            ...old,
            photos: [...old.photos, ...files.map(toPhoto)]
        })

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

    return (
        <div className="form-group">
            <FileInput multiple required onPick={select} mr="0.5rem" label="Upload photo" />
            {store.message && <span className="text-danger">{store.message}</span>}
        </div>
    )
}

export default UploadPhotos