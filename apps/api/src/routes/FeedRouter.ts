import { Router } from 'express'
import { getUserFeed, usePublicFeed } from '../controllers/feedController'
import { verifyUser } from '../middlewares'

export const FeedRouter = Router()

FeedRouter.get('/', [
  verifyUser,
], getUserFeed)

FeedRouter.get('/public-posts', [
  verifyUser,
], usePublicFeed)
