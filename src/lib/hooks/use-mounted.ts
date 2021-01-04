import { useEffect, useRef } from "react"

const useMounted = () => {
    const mount = useRef(false)

    useEffect(() => {
        mount.current = true

        return () => {
            mount.current = false
        }
    }, [])

    return mount;
}

export default useMounted;