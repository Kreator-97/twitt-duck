import { Router } from 'express'
import { param, body } from 'express-validator'

import { validateFields, verifyUser } from '../middlewares'
import { createPost, getAllPosts, getPostsByUsername, updatePostPrivacy } from '../controllers/postController'

export const PostRouter = Router()

PostRouter.get('/', getAllPosts)

PostRouter.get('/user/:username', [
  param('username', 'param username must to be valid').notEmpty(),
  validateFields
], getPostsByUsername)

PostRouter.post('/', [
  verifyUser,
  body('content', 'content is required').notEmpty(),
  validateFields
], createPost)

PostRouter.put('/:postId', [
  verifyUser,
  param('postId', 'param postId must to be valid').notEmpty().isUUID(),
  body('privacy', 'privacy value is required').notEmpty(),
  validateFields
], updatePostPrivacy)
