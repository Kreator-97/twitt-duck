import { Router } from 'express'
import { param, body } from 'express-validator'

import { validateFields, verifyUser } from '../middlewares'
import { createPost, getAllPosts, getPostById, getPostsByUsername, toggleLike, updatePostPrivacy } from '../controllers/postController'

export const PostRouter = Router()

PostRouter.get('/', getAllPosts)

PostRouter.get('/user/:username', [
  param('username', 'param username no puede estar vacio').notEmpty(),
  validateFields
], getPostsByUsername)

PostRouter.get('/:postId', [
  param('postId', 'postId param es requerido'),
  validateFields,
], getPostById)

PostRouter.post('/', [
  verifyUser,
  body('content', 'content es requerido').notEmpty(),
  validateFields
], createPost)

PostRouter.put('/:postId', [
  verifyUser,
  param('postId', 'param postId debe ser válido').notEmpty().isUUID(),
  body('privacy', 'privacy value es requerido').notEmpty(),
  validateFields
], updatePostPrivacy)

PostRouter.put('/:postId/toggle-like', [
  verifyUser,
  param('postId', 'param postId debe ser válido').notEmpty().isUUID(),
  validateFields,
], toggleLike)
