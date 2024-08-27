import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRET
export const signToken = (payload: {[key: string]: string}) => {

  if( !secret ) {
    throw new Error('SECRET is not defined')
  }

  const token = jwt.sign(payload, secret, { expiresIn: '30d' })
  return token
}

export const validateToken = (token: string):Promise<{id: string}> => {
  return new Promise((resolve, reject) => {

    console.log({ secret })

    if( !secret ) {
      throw new Error('SECRET is not defined')
    }

    try {
      const payload = jwt.verify(token, secret) as { id: string }
      return resolve(payload)
      
    } catch (error) {
      console.error('ERROR unknow:', error)
      reject((error as { message: string }).message )
    }
  })
}
