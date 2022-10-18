import { Router } from 'express'
import { changeProfileImage } from '../controllers/profileController'
import { verifyUser } from '../middlewares'

export const ProfileRouter = Router()

ProfileRouter.post('/change-img', [
  verifyUser,
], changeProfileImage)
