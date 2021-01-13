import { Titled } from "types";

export const byTitle = <T extends Titled>(a: T, b: T) =>
    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1

export const parseSearch = <T = {}>(search: string) => search
    .replace(/^\//, '')
    .split('&')
    .map(pair => pair.split('='))
    .reduce<T>((acc, [key, val]) => ({ ...acc, [key]: val }), {} as T)
