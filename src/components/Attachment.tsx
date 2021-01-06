import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useEffect } from 'react'

const Div = styled.div<{ url: string }>`
    background-image: url(${p => p.url});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;
    background-position: center;
    width: 256px;
    height: 256px;
`

type Props = {
    file: File;
}

const Attachment: React.FC<Props> = ({ file }) => {
    const [url, setUrl] = useState<string | undefined>()

    useEffect(() => {
        const t = URL.createObjectURL(file);
        setUrl(t)
        return () => void URL.revokeObjectURL(t);
    }, [file]);

    if (!url) return null

    return (
        <div className="form-group">
            <Div url={url} />
        </div>
    )
}

export default Attachment