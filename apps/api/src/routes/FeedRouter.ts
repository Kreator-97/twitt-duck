import { Router } from 'express'
import { getUserFeed } from '../controllers/feedController'
import { verifyUser } from '../middlewares'

export const FeedRouter = Router()

FeedRouter.get('/', [
  verifyUser,
], getUserFeed)
