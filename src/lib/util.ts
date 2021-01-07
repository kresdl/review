import { Titled, Indexed } from "types"

export const byTitle = <T extends Titled>(a: T, b: T) =>
    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1

export const toIndexed = <T extends Titled>(item: T) => 
    ({ id: item.title, ...item })
