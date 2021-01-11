import styled from "@emotion/styled"
import { space, SpaceProps } from 'styled-system'
import auth from "lib/auth"
import { HTMLAttributes } from "react"

const invite = () => {
    const email = prompt('Send an album invitation to the following email adress:')
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

const Invite: React.FC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...rest }) => (
    <button onClick={invite} {...rest}>✉</button>
)

export default styled(Invite)<SpaceProps>(space)