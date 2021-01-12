import React, { HTMLAttributes } from "react"
import svg from 'images/pencil.svg'
import ImageButton from "./ImageButton"

type Props = {
  size: number | string
  album: string
}

const EditName: React.FC<Props & HTMLAttributes<HTMLButtonElement>> = ({ size, album, ...rest }) => (
    <ImageButton size={size} url={svg} {...rest} />
)

export default EditName