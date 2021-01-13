import auth from "lib/auth"
import React, { HTMLAttributes } from "react"
import svg from 'images/email.svg'
import ImageButton from "./ImageButton"

const invite = (album: string) => {
  const email = prompt(`Send a link for the album "${album}" to the following email adress:`, 'peter.hallstrom@gmail.com')
  if (!email) return

  const settings = {
    url: 'http://localhost:3000/guest',
    handleCodeInApp: true,
  };

  auth.sendSignInLinkToEmail(email, settings).catch(alert)
}

type Props = {
  size: number | string
  album: string
}

const Invite: React.FC<Props & HTMLAttributes<HTMLButtonElement>> = ({ size, id, album, ...rest }) => (
  <ImageButton onClick={() => invite(album)} size={size} url={svg} {...rest} />
)

export default Invite