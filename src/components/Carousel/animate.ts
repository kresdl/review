import { interpolate, ease } from '../../lib/hooks/use-animation'

export type State = {
    mask: {
        x: number
        width: number
    }
    a: {
        x: number
    },
    b: {
        x: number
    }
}

const animate = (p: number, shift: number, reverse?: boolean): State => {
    const ipl = interpolate(ease(p))

    return reverse
        ? {
            a: {
                x: ipl(-shift, 0),
            },
            b: {
                x: ipl(0, shift),
            },
            mask: {
                x: ipl(0, 1),
                width: ipl(1, 0),
            }
        }
        : {
            a: {
                x: ipl(shift, 0),
            },
            b: {
                x: ipl(0, -shift),
            },
            mask: {
                x: 0,
                width: ipl(1, 0),
            }
        }
}


export default animate;