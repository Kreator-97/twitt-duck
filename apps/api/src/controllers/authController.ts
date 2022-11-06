import { Request, Response } from 'express'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import prisma from '../lib/prisma'
import { signToken } from '../util/jwt'
import { ApiResponse } from '../interfaces'
import { verify } from '../util/google-verify'

interface UserResponse extends ApiResponse {
  user?: User;
  token?: string;
}

export const register = async (req: Request, res: Response<UserResponse>) => {
  const { fullname, email, password } = req.body

  const isThisEmailExists = await prisma.user.findUnique({ where: { email }})

  if( isThisEmailExists ) {
    return res.status(400).json({
      ok: false,
      msg: 'Este correo ya existe'
    })
  }

  const hash = bcrypt.hashSync(password, 10)

  try {
    const user = await prisma.user.create({data: {
      email,
      fullname,
      password: hash,
    }})

    const token = signToken({ id: user.id })

    return res.status(201).json({
      ok: true,
      msg: 'Usuario nuevo creado',
      user,
      token,
    })
  }
  catch (error: any ) { // eslint-disable-line 
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error al intentar crear al usuario',
      error: error.message,
    })
  }
}

export const login = async (req: Request, res: Response<UserResponse>) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `Usuario con email ‘${email}’ no existe`
    })
  }

  const isValidPassword = bcrypt.compareSync(password, user.password)

  if( !isValidPassword ) {
    return res.status(400).json({
      ok: false,
      msg: 'Error de credenciales'
    })
  }

  try {
    const token = signToken({ id: user.id })
    
    return res.status(200).json({
      ok : true,
      msg: 'Inicio de sesión exitoso',
      token,
      user: {...user, password: '' }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Ocurrió un error en el servidor',
      ok: false
    })
  }
}

export const renewToken = async (req: Request, res: Response) => {
  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      ok: true,
      msg: 'Usuario id no válido'
    })
  }

  try {
    const token = signToken({ id: userId })
  
    return res.status(200).json({
      ok: true,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Ocurrió un error en el servidor',
      ok: false
    })
  }
}

export const activateUser = async (req: Request, res: Response<UserResponse>) => {
  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'Id dentro del token no es válido'
    })
  }

  const { username, description } = req.body
  
  const isThisUsernameExists = await prisma.user.findUnique({ where: { username }})

  if( isThisUsernameExists ) {
    return res.status(400).json({
      ok: false,
      msg: 'Este username no se encuentra disponible. Pruebe con otro'
    })
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      username,
      description,
      active: true
    }
  })

  try {
    const token = signToken({ id: user.id })
  
    return res.status(200).json({
      msg: 'Se ha finalizado el perfil del usuario',
      ok: true,
      token,
      user: {...user, password: '' }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Ocurrió un error en el servidor',
      ok: false
    })
  }
}

export const signInGoogle = async (req: Request, res: Response<UserResponse>) => {
  const { id_token } = req.body

  try {
    const userInfo = await verify(id_token)

    if( !userInfo ) {
      return res.status(400).json({
        ok: false,
        msg: 'Token no pudo ser verificado'
      })
    }

    const { email, name, picture } = userInfo

    const isUserExists = await prisma.user.findUnique({ where: { email }})

    if( isUserExists ) {
      try {
        const token = signToken({ id: isUserExists.id })
  
        return res.status(200).json({
          msg: 'Inicio de sesión con Google exitoso',
          ok: true,
          user: isUserExists,
          token
        })
      } catch (error) {
        console.log(error)
        res.status(500).json({
          msg: 'Ocurrió un error en el servidor',
          ok: false
        })
      }
    }

    const user = await prisma.user.create({
      data: {
        email: email!,    // eslint-disable-line
        fullname: name!,  // eslint-disable-line
        username: name!,  // eslint-disable-line
        password: '@',
        profilePic: picture,
        provider: 'GOOGLE'
      }
    })

    const token = signToken({ id: user.id })

    return res.status(200).json({
      ok: true,
      msg: 'Usuario creado usando Google Identity',
      token,
      user,
    })
    
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      ok: false,
      msg: 'Ocurrio un error con el proveedor de autenticación'
    })
  }
}
