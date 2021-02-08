import styled from '@emotion/styled'
import Toggle from './Toggle'

const StyledToggle = styled(Toggle)`
    position: absolute;
    width: 30px;
    height: 30px;
    bottom: -10px;
    right: -10px;
    background-color: white;
    border: 1px solid black;
    z-index: 1;
    border-radius: 3px;
    background-image: none;
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
`

export default StyledToggle;
