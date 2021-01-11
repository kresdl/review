import { HTMLAttributes } from "react"

type Props = {
    url: string
    size: number | string
}

const ImageButton: React.FC<Props & HTMLAttributes<HTMLButtonElement>> = ({ size, url, ...rest }) => (
    <button type="button" {...rest}><img width={size} src={url} /></button>
)

export default ImageButton