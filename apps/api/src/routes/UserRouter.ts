import { Router } from 'express'
import { param } from 'express-validator'

import { getUserByUsername } from '../controllers/userController'
import { validateFields } from '../middlewares'

export const UserRouter = Router()

UserRouter.get('/:username', [
  param('username', 'username param is mandatory').notEmpty(),
  validateFields,
],getUserByUsername)


