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
    width: 120px;
    height: 120px;
    position: relative;
    flex-shrink: 0;
    ${space}
`

export default Thumbnail;