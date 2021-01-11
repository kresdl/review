import styled from "@emotion/styled"
import { CSSProperties, HTMLAttributes, useState } from "react"

const Label = styled.label`
    cursor: pointer;
`

type Props = {
    url: string
    size: number | string
    activeStyle: CSSProperties
    onToggle: (state: boolean) => void
}

const Toggle: React.FC<Props & HTMLAttributes<HTMLInputElement>> = ({ size, url, style, activeStyle, className, onToggle, ...rest }) => {
    const [active, setActive] = useState(false)
    
    const change = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = evt.target
        setActive(checked)
        onToggle(checked)
    }

    return (
        <Label style={active ? activeStyle : style} className={className}>
            <img width={size} src={url} />
            <input className="d-none" type="checkbox" {...rest} onChange={change} />
        </Label>
    )
}

export default Toggle