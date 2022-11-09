import { Router } from 'express'
import { resetDB } from '../controllers/resetController'

export const DBRouter = Router()

DBRouter.delete('/reset', resetDB)
