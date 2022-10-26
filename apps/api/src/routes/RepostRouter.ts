import { Router } from 'express'
import { body, param } from 'express-validator'
import { createRepost, deleteRepost } from '../controllers/RepostController'
import { validateFields, verifyUser } from '../middlewares'

export const RepostRouter = Router()

RepostRouter.post('/', [
  verifyUser,
  body('postId', 'postId es requerido').notEmpty(),
  body('type', 'type es requerido').notEmpty(),
  validateFields,
] , createRepost)

RepostRouter.delete('/:repostId', [
  verifyUser,
  param('repostId', 'repostId es requerido').notEmpty(),
  validateFields,
], deleteRepost)
