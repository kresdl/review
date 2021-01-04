import { useCallback, useRef, useState } from "react";

type State = {
    id?: number | null
}

export type Animation = {
    cursor: number | null
    play: (time: number) => Promise<void>
    stop: () => void
    playing: boolean
}

export const interpolate = (p: number) =>
    (from: number, to: number) =>
        p * (to - from) + from

export const ease = (x: number) =>
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

const useAnimation = (): Animation => {
    const [cursor, setCursor] = useState<number | null>(null)
    const ref = useRef<State>({});

    const play = useCallback(
        (time: number) => new Promise<void>(res => {
            const frame = (timestamp: number) => {
                if (!ref.current.id) {
                    setCursor(null)
                    return res()
                }

                const elapsed = timestamp - startTime;
                const p = elapsed / time;

                if (p < 1) {
                    ref.current.id = requestAnimationFrame(frame)
                    setCursor(p)
                } else {
                    ref.current.id = null
                    setCursor(null)
                    res()
                }
            }

            const startTime = performance.now()
            ref.current.id = requestAnimationFrame(frame)
        }),
        []
    )

    const stop = useCallback(() => {
        ref.current.id = null
    }, [])

    return {
        cursor, play, stop,
        playing: typeof cursor === 'number'
    }
}

export default useAnimation
