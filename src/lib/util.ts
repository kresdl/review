import { Titled } from "types"

export const byTitle = (a: Titled, b: Titled) =>
    a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
