import auth from "lib/auth"
import React, { HTMLAttributes } from "react"
import svg from 'images/email.svg'
import ImageButton from "./ImageButton"
import { grantGuest } from "lib/db"

const invite = async (albumId: string, albumName: string) => {
    const email = prompt(`Send a link for the album "${albumName}" to the following email adress:`, 'peter.hallstrom@medieinstitutet.se')
    if (!email) return

    const settings = {
        url: 'http://localhost:3000/user/albums',
        handleCodeInApp: true,
    };

    try {
        await grantGuest(email, albumId)
        auth.sendSignInLinkToEmail(email, settings).catch(alert)
    } catch (err) {
        console.log(err)
    }
}

type Props = {
    size: number | string
    albumId: string
    albumName: string
}

const Invite: React.FC<Props & HTMLAttributes<HTMLButtonElement>> = ({ size, albumId, albumName, ...rest }) => (
    <ImageButton onClick={() => invite(albumId, albumId)} size={size} url={svg} {...rest} />
)

export default Invite