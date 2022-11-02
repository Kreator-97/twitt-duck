import { Router } from 'express'
import { param } from 'express-validator'
import { deleteNotification, getNotifications, markAllNotificationsAsRead } from '../controllers/notificationController'
import { validateFields, verifyUser } from '../middlewares'

export const NotificationRouter = Router()

NotificationRouter.get('/', [
  verifyUser,
], getNotifications)

NotificationRouter.delete('/:notificationId', [
  verifyUser,
  param('notificationId', 'notificationId debe ser un id válido').isUUID(),
  validateFields,
], deleteNotification)

NotificationRouter.get('/mark-all-as-read', [
  verifyUser,
], markAllNotificationsAsRead)
