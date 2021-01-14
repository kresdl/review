import styled from "@emotion/styled"
import { CSSProperties, HTMLAttributes, useState } from "react"

const Label = styled.label`
    margin-bottom: 0;
    cursor: pointer;
`

type Props = {
    imageUrl?: string
    imageSize?: number | string
    activeStyle: CSSProperties
    onToggle: (state: boolean) => void
}

const Toggle: React.FC<Props & HTMLAttributes<HTMLInputElement>> = ({ imageSize, imageUrl, style, activeStyle, className, onToggle, ...rest }) => {
    const [active, setActive] = useState(false)
    
    const change = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = evt.target
        setActive(checked)
        onToggle(checked)
    }

    return (
        <Label style={active ? activeStyle : style} className={className}>
            {imageUrl && <img width={imageSize} src={imageUrl} alt="" />}
            <input className="d-none" type="checkbox" {...rest} onChange={change} />
        </Label>
    )
}

export default Toggle