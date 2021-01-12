import auth from "lib/auth"
import React, { HTMLAttributes } from "react"
import svg from 'images/email.svg'
import ImageButton from "./ImageButton"

const invite = (album: string) => {
    const email = prompt(`Send a link for the album "${album}" to the following email adress:`)
    if (!email) return

    const settings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
      };

      auth.sendSignInLinkToEmail(email, settings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });      
}

type Props = {
  size: number | string
  album: string
}

const Invite: React.FC<Props & HTMLAttributes<HTMLButtonElement>> = ({ size, album, ...rest }) => (
  <ImageButton onClick={() => invite(album)} size={size} url={svg} {...rest} />
)

export default Invite