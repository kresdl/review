import { Album, Photo } from 'types'
import { get } from 'lib/storage'
import store from './store'

export const toPhotoRepresentation = (file: File): Photo => ({
    url: URL.createObjectURL(file),
    name: file?.name,
})

export const inflate = async (title: string, photos: string[]): Promise<Album<Photo>> => ({
    title,
    photos: await Promise.all(photos.map(photo => get(photo, store.uid)))
})
