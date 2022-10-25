import {Request, Response, NextFunction} from 'express'
import { validateToken } from '../util/jwt'

export const verifyUser = async (req: Request, res:Response, next: NextFunction) => {

  const token = req.header('authorization')?.split(' ')[1]
  if( !token ) {
    return res.status(400).json({
      ok: false,
      msg: 'Token not sent'
    })
  }
  
  try {
    const payload = await validateToken(token)

    req.userId = payload.id

    next()
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Token error',
      error
    })
  }
}
