import { Request, Response } from 'express'
import { User } from '@prisma/client'

import prisma from '../lib/prisma'
import { ApiResponse } from '../interfaces'

interface UserResponse extends ApiResponse {
  user?: User
}

export const getUserByUsername = async (req:Request, res: Response<UserResponse>) => {
  const { username } = req.params
  const user = await prisma.user.findUnique({where: { username }})

  if( !user ) {
    return res.status(404).json({
      msg: `Usuario ‘${username}’ no existe en la base de datos`,
      ok: false,
    })
  }

  return res.status(200).json({
    ok: true,
    msg: 'Usuario encontrado',
    user: { ...user, password: '' }
  })
}
