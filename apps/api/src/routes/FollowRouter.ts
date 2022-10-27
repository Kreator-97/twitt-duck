import { Router } from 'express'
import { param } from 'express-validator'
import { addFollower } from '../controllers/followController'
import { validateFields, verifyUser } from '../middlewares'

export const FollowRouter = Router()

FollowRouter.post('/:userIdToFollow', [
  verifyUser,
  param('userIdToFollow', 'userIdToFollow es obligatorio').notEmpty(),
  validateFields,
], addFollower)
