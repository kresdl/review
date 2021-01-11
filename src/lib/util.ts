import { Album, Photo } from 'types'
import { get } from 'lib/storage'
import store from './store'

export const toPhotoRepresentation = (file: File): Photo => ({
    url: URL.createObjectURL(file),
    name: file?.name,
})

export const inflate = async (album: string, photos: string[]): Promise<Album<Photo>> => ({
    title: album,
    photos: await Promise.all(photos.map(async photo => ({
        name: photo, 
        url: await get(photo, store.uid)
    })))
})
