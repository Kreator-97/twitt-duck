import { Router } from 'express'
import { uploadImages } from '../controllers/uploadController'
import { verifyUser } from '../middlewares'

export const UploadRouter = Router()

UploadRouter.post('/', [
  verifyUser,
], uploadImages)
