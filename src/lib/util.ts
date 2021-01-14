import { Doc, SavedAlbum, Titled, User } from "types";

export const byTitle = <T extends Titled>(a: T, b: T) =>
    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1

export const parseSearch = <T = {}>(search: string) => search
    .replace(/^\//, '')
    .split('&')
    .map(pair => pair.split('='))
    .reduce<T>((acc, [key, val]) => ({ ...acc, [key]: val }), {} as T)

export const withId = (doc: Doc) => ({ id: doc.id, ...doc.data() }) as SavedAlbum

export const getUserFromStorage = () => {
    const item = sessionStorage.getItem('user')
    if (!item) return undefined
    return JSON.parse(item) as User
}