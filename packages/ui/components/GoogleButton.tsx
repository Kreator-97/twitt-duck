import { useRef, useEffect, FC } from 'react'

interface Props {
  onSignIn?: (token: string) => void;
}

export const GoogleButton: FC<Props> = ({onSignIn}) => {

  const divRef = useRef(null)

  useEffect(() => {
    if (divRef.current) {

      window.google.accounts.id.initialize({
        client_id: '843346613507-555meqlnppf2cq289rcmd1ariul2suo4.apps.googleusercontent.com',
        callback: (res, error) => { // eslint-disable-line
          console.error('error', error)
          onSignIn && onSignIn(res.credential)
        },
      })
    
      window.google.accounts.id.renderButton(divRef.current, {
        size: 'large',
        type: 'standard',
        text: 'continue_with',
      })
    }
  }, [divRef.current])
  return (
    <div
      ref={divRef}
    ></div>
  )
}
