import { Request, Response } from 'express'
import { uploadCloudinary } from '../util/uploadCloudinary'

export const uploadImages = async (req: Request, res: Response) => {
  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      msg: 'Token no pudo ser verificado',
      ok: false
    })
  }

  try {
    const imgURL = await uploadCloudinary(req, 'image')

    return res.status(201).json({
      msg: imgURL,
      ok: true
    })

  } catch (error) {
    console.error(error)
    if( error?.message.includes('options.maxFileSize') ) {
      return res.status(500).json({
        msg: 'Elige otra imagen que pese menos de 2mb',
        ok: false
      })
    }
    return res.status(500).json({
      msg: 'Ocurrió un error al hacer la carga de la imagen',
      ok: false
    })
  }
}
