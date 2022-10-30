import { Router } from 'express'
import { body, param } from 'express-validator'
import { validateFields, verifyUser } from '../middlewares'
import {
  AddComment,
  addSubcomment,
  getCommentById,
  toggleLikeComment
} from '../controllers/commentController'

export const CommentRouter = Router()

CommentRouter.get('/:commentId', [
  param('commentId', 'commentId es requerido y debe ser un id valido').isUUID(),
  validateFields,
], getCommentById)

CommentRouter.post('/subcomment', [
  verifyUser,
  body('commentId', 'commentId es requerido').isUUID(),
  body('content', 'content es requerido').notEmpty(),
  validateFields
], addSubcomment)

CommentRouter.post('/:postId', [
  verifyUser,
  body('content', 'content es requerido').notEmpty(),
  param('postId', 'postId es requerido y debe ser válido').isUUID(),
  validateFields
], AddComment)

CommentRouter.put('/:commentId/toggle-like', [
  verifyUser,
  param('commentId', 'commentId es requerido y debe ser un id valido').isUUID(),
  validateFields
], toggleLikeComment)
