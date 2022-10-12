import { Request, Response } from 'express'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import prisma from '../lib/prisma'
import { signToken } from '../util/jwt'
import { ApiResponse } from '../interfaces'

interface UserResponse extends ApiResponse {
  user?: User;
  token?: string;
}

export const register = async (req: Request, res: Response<UserResponse>) => {
  const { fullname, email, username, password} = req.body

  const isThisEmailExists = await prisma.user.findUnique({ where: { email }})

  if( isThisEmailExists ) {
    return res.status(400).json({
      ok: false,
      msg: 'This email already taken'
    })
  }

  const isThisUsernameExists = await prisma.user.findUnique({ where: { username }})

  if( isThisUsernameExists ) {
    return res.status(400).json({
      ok: false,
      msg: 'This username already taken'
    })
  }

  const hash = bcrypt.hashSync(password, 10)

  try {
    const user = await prisma.user.create({data: {
      email,
      username,
      fullname,
      password: hash,
    }})

    const token = signToken({ id: user.id })
  
    return res.status(200).json({
      ok: true,
      msg: 'new user created',
      token,
      user,
    })
  }
  catch (error: any ) { // eslint-disable-line 
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'An error ocurred when trying to create a new user',
      error: error.message,
    })
  }
}

export const login = async (req: Request, res: Response<UserResponse>) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email }})

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `User with email ‘${email}’ does not exist`
    })
  }

  const isValidPassword = bcrypt.compareSync(password, user.password)

  if( !isValidPassword ) {
    return res.status(404).json({
      ok: false,
      msg: 'password invalid'
    })
  }

  const token = signToken({ id: user.id })

  return res.status(200).json({
    ok : true,
    msg: 'user logged successfully',
    token
  })
} 

export const renewToken = async (req: Request, res: Response) => {
  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      ok: true,
      msg: 'userId not valid'
    })
  }

  const token = signToken({ id: userId })

  res.json({
    ok: true,
    token,
  })
}
