import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import { uploadCloudinary } from '../util/uploadCloudinary'

// this controller upload images to cloudinary and also update the user's image
export const changeProfileImage = async (req: Request, res: Response) => {
  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      msg: 'Token no pudo ser verificado',
      ok: false
    })
  }

  const user = await prisma.user.findUnique({ where: { id: userId }})

  if( !user ) {
    return res.status(400).json({
      msg: 'Token invalido: No existe usuario en DB',
      ok: false
    })
  }

  try {
    const imgURL = await uploadCloudinary(req, 'profile')
    
    await prisma.user.update({ where: { id: userId }, data: { profilePic: imgURL} } )

    return res.status(201).json({
      msg: imgURL,
      ok: true
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ocurrió un error al hacer la carga de la imagen',
      ok: false
    })
  }
}

export const uploadMediaImg = async (req: Request, res: Response) => {
  try {
    const imgURL = await uploadCloudinary(req, 'image')
    return res.status(201).json({
      msg: imgURL
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ocurrió un error al hacer la carga de la imagen'
    })
  }
}
