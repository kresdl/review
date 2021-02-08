import React, { useRef } from 'react'
import Header from './Header'
import Photos from './Photos'

const Album: React.FC = () => {
    const array = useRef<string[]>([])

    const onToggle = (name: string, active: boolean) => {
        const arr = array.current
        if (active) arr.push(name)
        else arr.splice(arr.indexOf(name), 1)
    }

    return (
        <>
            <Header selection={array} />
            <Photos onToggle={onToggle} />
        </>
    )
}


export default Album