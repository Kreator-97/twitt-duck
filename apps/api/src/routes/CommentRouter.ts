import { Router } from 'express'
import { body, param } from 'express-validator'
import { AddComment } from '../controllers/commentController'
import { validateFields, verifyUser } from '../middlewares'

export const CommentRouter = Router()

CommentRouter.post('/:postId', [
  verifyUser,
  body('content', 'content es requerido').notEmpty(),
  param('postId', 'postId es requerido y debe ser válido').isUUID(),
  validateFields
], AddComment)
