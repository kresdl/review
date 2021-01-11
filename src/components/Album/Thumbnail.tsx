import styled from '@emotion/styled'
import { space, SpaceProps } from 'styled-system'

const Thumbnail = styled.div<{ url: string } & SpaceProps>`
    display: inline-block;
    background-image: url(${p => p.url});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: black;
    background-position: center;
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.25), 0 2px 8px 0 rgba(0, 0, 0, 0.25);
    width: 120px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 4px;
    cursor: pointer;
    ${space}
`

export default Thumbnail;