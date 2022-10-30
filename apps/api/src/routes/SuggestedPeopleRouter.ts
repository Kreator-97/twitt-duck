import { Router } from 'express'
import { getSuggestedPeople } from '../controllers/suggestedPeopleController'
import { verifyUser } from '../middlewares'

export const SuggestedPeopleRouter = Router()

SuggestedPeopleRouter.get('/', [
  verifyUser,
], getSuggestedPeople)
