import { Router } from 'express'
import { param, body } from 'express-validator'

import { validateFields, verifyUser } from '../middlewares'
import { createPost, getAllPosts, getPostsByUser, updatePostPrivacy } from '../controllers/postController'

export const PostRouter = Router()

PostRouter.get('/', getAllPosts)

PostRouter.get('/user/:userId', [
  param('userId', 'param userId must to be valid').notEmpty().isUUID(),
  validateFields
], getPostsByUser)

PostRouter.post('/', [
  verifyUser,
  body('title', 'title is required').notEmpty(),
  body('title', 'content is required').notEmpty(),
  validateFields
], createPost)

PostRouter.put('/:postId', [
  verifyUser,
  param('postId', 'param postId must to be valid').notEmpty().isUUID(),
  body('privacy', 'privacy value is required').notEmpty(),
  validateFields
], updatePostPrivacy)
