import { Router } from 'express'
import { body, param } from 'express-validator'

import {
  changeBackgroundPicture,
  changePassword,
  getUserByUsername,
  getUserInfo,
  updateUserByUsername
} from '../controllers/userController'

import { validateFields, verifyUser } from '../middlewares'

export const UserRouter = Router()

UserRouter.get('/info/:username', [
  param('username', 'username parametro es requerido').notEmpty(),
  validateFields,
], getUserInfo)

UserRouter.get('/:username', [
  param('username', 'username parametro es requerido').notEmpty(),
  validateFields,
], getUserByUsername)

UserRouter.put('/', [
  verifyUser,
  body('fullname', 'fullname es requerido').notEmpty(),
  body('username', 'username es requerido').notEmpty(),
  body('description', 'description es requerido').notEmpty(),
  validateFields,
], updateUserByUsername)

UserRouter.put('/change-password', [
  verifyUser,
  body('currentPassword', 'currentPassword es requerido').notEmpty(),
  body('newPassword', 'newPassword es requerido y debe de tener 8 caracteres como mínimo').notEmpty().isLength({min: 8}),
  validateFields,
], changePassword)

UserRouter.put('/change-background-picture', [
  verifyUser,
  body('backgroundPic', 'backgroundPic es requerido').notEmpty(),
  validateFields,
], changeBackgroundPicture)

