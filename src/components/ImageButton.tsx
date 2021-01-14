import { HTMLAttributes } from "react"

type Props = {
    url: string
    imageSize: number | string
}

const ImageButton: React.FC<Props & HTMLAttributes<HTMLButtonElement>> = ({ imageSize, url, ...rest }) => (
    <button type="button" {...rest}><img alt="" width={imageSize} src={url} /></button>
)

export default ImageButton