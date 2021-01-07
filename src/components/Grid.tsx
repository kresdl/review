import styled from '@emotion/styled'
import React from 'react'

const Div = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 120px);
    grid-auto-rows: 120px;
`

const Grid: React.FC = ({ children }) => (
    <Div>{children}</Div>
)

export default Grid