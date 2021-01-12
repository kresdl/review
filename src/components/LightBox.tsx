import styled from '@emotion/styled'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

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

const LightBox: React.FC = () => {
    const location = useLocation<string>()
    const history = useHistory()

    return (
        <Bg url={location.state} onClick={history.goBack}/>
    )
}

export default LightBox