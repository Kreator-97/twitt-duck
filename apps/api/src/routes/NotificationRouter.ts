import { Router } from 'express'
import { getNotifications } from '../controllers/notificationController'
import { verifyUser } from '../middlewares'

export const NotificationRouter = Router()

NotificationRouter.get('/', [
  verifyUser,
], getNotifications)
