import { Router } from 'express'
import { param } from 'express-validator'
import { addFollower, getFollowsByUsername } from '../controllers/followController'
import { validateFields, verifyUser } from '../middlewares'

export const FollowRouter = Router()

FollowRouter.get('/:username', [
  param('username', 'username es obligatorio').notEmpty(),
  validateFields,
], getFollowsByUsername)

FollowRouter.post('/:username', [
  verifyUser,
  param('username', 'username es obligatorio').notEmpty(),
  validateFields,
], addFollower)
