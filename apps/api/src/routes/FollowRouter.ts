import { Router } from 'express'
import { param } from 'express-validator'
import { addFollower, getFollowsByUsername, unfollowUser } from '../controllers/followController'
import { validateFields, verifyUser } from '../middlewares'

export const FollowRouter = Router()

FollowRouter.get('/:username', [
  param('username', 'username es obligatorio').notEmpty(),
  validateFields,
], getFollowsByUsername)

FollowRouter.delete('/:username', [
  verifyUser,
  param('username', 'username es obligatorio').notEmpty(),
  validateFields,
], unfollowUser)

FollowRouter.post('/:username', [
  verifyUser,
  param('username', 'username es obligatorio').notEmpty(),
  validateFields,
], addFollower)
