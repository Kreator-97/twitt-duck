import { Request, Response } from 'express'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import prisma from '../lib/prisma'
import { ApiResponse } from '../interfaces'

interface UserResponse extends ApiResponse {
  user?: User
}

export const getUserInfo = async (req: Request, res: Response) => {
  const username = req.params.username
  const user = await prisma.user.findUnique({ where: { username }})

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `El usuario con el username ${username} no existe en la base de datos`
    })
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: user.id
    },
    include: {
      author: true,
      comments: true,
      likes: {
        include: {
          user: true
        }
      },
      images: true,
      reposts: {
        include: { author: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // we show only the post who user liked
  const likes = await prisma.likes.findMany({
    where: {
      userId: user.id,
      postId: {
        not: null
      }
    },
    include: {
      comment: true,
      post: {
        include: {
          author: true,
          likes: {
            include: {
              user: true,
            }
          },
          images: true,
          comments: true,
          reposts: {
            include: {
              author: true,
            }
          },
        }
      },
      user: true,
    },
    orderBy: {
      post: {
        createdAt: 'desc'
      }
    }
  })

  const images = await prisma.images.findMany({
    where: {
      post: {
        authorId: user.id
      }
    },
    orderBy: {
      post: {
        createdAt: 'desc'
      }
    }
  })

  return res.status(200).json({
    ok: true,
    msg: 'user found',
    posts,
    images,
    likes,
  })
}

export const getUserByUsername = async (req:Request, res: Response<UserResponse>) => {
  const { username } = req.params
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      followers: true, following: true
    }
  })

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

export const updateUserByUsername = async (req: Request, res: Response<UserResponse>) => {
  // this endpoint can update a username using the previous username
  const { fullname, username, description } = req.body
  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'userId en el token es inválido'
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: 'Usuario no encontrado'
    })
  }

  if( user.username !== username ) {
    // if username changes, then verify if username was taken previosly

    const isUsernameAlreadyTaken = await prisma.user.findUnique({
      where: { username }
    })
    
    if( isUsernameAlreadyTaken ) {
      return res.status(400).json({
        ok: false,
        msg: 'Este nombre de usuario fue tomado previamente'
      })
    }
  }

  try {
    const newUser = await prisma.user.update({
      where: { id: userId },
      data: { fullname, description, username }
    })

    return res.status(202).json({
      ok: true,
      msg: 'Información actualizada correctamente',
      user: { ...newUser, password: '' }
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error al intentar hacer la actualización del usuario',
    })
  }

}

export const changePassword = async (req: Request, res: Response<UserResponse>) => {
  const userId = req.userId
  const { currentPassword, newPassword } = req.body

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'userId en el token es inválido'
    })
  }

  const user = await prisma.user.findUnique({ where: { id: userId }})

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: 'Usuario no encontrado'
    })
  }

  const isValidPassword = bcrypt.compareSync(currentPassword, user.password)

  if( !isValidPassword ) {
    return res.status(400).json({
      ok: false,
      msg: 'Error de credenciales. Verifique su correo o contraseña'
    })
  }

  try {
    await prisma.user.updateMany({
      where: { id: userId },
      data: {
        password: bcrypt.hashSync(newPassword, 10)
      }
    })

    return res.status(202).json({
      ok: true,
      msg: 'Contraseña actualizada correctamente'
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrio un error al intentar cambiar la contraseña',
      error: 'Ocurrio un error al intentar cambiar la contraseña',
    })
  }
}

export const changeBackgroundPicture = async (req: Request, res: Response) => {
  const { backgroundPic } = req.body

  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'userId en el token es inválido'
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: 'Usuario no encontrado'
    })
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        backgroundPic,
      }
    })

    return res.status(202).json({
      ok: true,
      msg: 'Imagen de fondo actualizada',
      imgURL: backgroundPic,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      ok: false,
      msg: 'No se pudo actualizar la imagen de fondo',
      error,
    })
  }
}

export const deleteTestUser = async ( req: Request, res: Response ) => {
  const env = process.env.NODE_ENV
  if( (env === 'production' || env === 'development' ) ) return res.status(400).json({
    ok: false,
    msg: 'This endpoint only works on testing'
  })

  const email = req.params.email

  try {
    const user = await prisma.user.findUnique({ where: { email }})
    if( !user ) return res.status(404).json({ok: false})

    await prisma.user.delete({ where: { email }}) 
  
    return res.status(202).json({
      ok: true,
      msg: 'user deleted'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ok: false})
  }
}
