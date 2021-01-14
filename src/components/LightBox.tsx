import styled from '@emotion/styled'
import store from 'lib/store'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

const Bg = styled.div<{ url: string }>`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    background-color: black;
    background-image: url(${p => p.url});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`

type Params = {
    id: string
    photo: string
}

const LightBox: React.FC = () => {
    const history = useHistory()
    const { id, photo } = useParams<Params>()!
    const url = store.index[id].photos.find(p => photo === p.name)?.url
    if (!url) return null

    return (
        <Bg url={url} onClick={history.goBack}/>
    )
}

export default LightBox