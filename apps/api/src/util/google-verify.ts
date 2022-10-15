import { OAuth2Client } from 'google-auth-library'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

export async function verify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  })
  
  const payload = ticket.getPayload()

  if( payload ) {
    const { name, picture, email } = payload
    return { name, picture, email }
  } else {
    Promise.reject(null)
  } 
}
