import styled from '@emotion/styled'
import { space, SpaceProps } from 'styled-system'

const Thumbnail = styled.div<{ url: string } & SpaceProps>`
    display: inline-block;
    background-image: url(${p => p.url});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;
    background-position: center;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 4px;
    ${space}
`

export default Thumbnail;