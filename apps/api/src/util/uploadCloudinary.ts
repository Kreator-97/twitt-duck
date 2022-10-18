import { Request } from 'express'
import Formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'

import { parseFile } from './parseFile'

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

cloudinary.config({
  cloud_name: 'kreator',
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
})

export const uploadCloudinary = async (req: Request, type: 'profile' | 'image') => {
  try {
    const files = await parseFile(req)
    const url = await saveInCloudinary(files, type)
    return url
  } catch (error) {
    return Promise.reject(error)
  }
}

export const saveInCloudinary = async (file: Formidable.File, type: 'profile' | 'image'):Promise<string> => {
  let url = ''

  if( type === 'profile' ) {
    const res = await cloudinary.uploader.upload( file.filepath, {
      folder: 'twitt-duck/users/profiles',
      transformation: {
        width: 250,
        height: 250,
        gravity: 'faces',
        crop: 'fill'
      }
    })
    url = res.secure_url
  }
  
  if( type === 'image' ) {
    const res = await cloudinary.uploader.upload( file.filepath, { folder: 'twitt-duck/media/images' } )
    url = res.secure_url
  }
  
  try {
    return url
  } catch (error) {
    return Promise.reject(error)
  }
}
