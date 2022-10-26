import { Router } from 'express'
import { body } from 'express-validator'
import { createRepost } from '../controllers/RepostController'
import { validateFields, verifyUser } from '../middlewares'

export const RepostRouter = Router()

RepostRouter.post('/', [
  verifyUser,
  body('postId', 'postId es requerido').notEmpty(),
  body('type', 'type es requerido').notEmpty(),
  validateFields,
] , createRepost)
