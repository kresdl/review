import styled from '@emotion/styled'
import { space, SpaceProps } from 'styled-system'

const Thumbnail = styled.div<{ url: string } & SpaceProps>`
    display: inline-block;
    vertical-align: middle;
    background-image: url(${p => p.url});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;
    background-position: center;
    width: 60px;
    height: 60px;
    position: relative;
    ${space}
`

export default Thumbnail;