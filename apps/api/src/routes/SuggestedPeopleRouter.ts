import { Router } from 'express'
import { getSuggestedPeople } from '../controllers/suggestedPeopleController'

export const SuggestedPeopleRouter = Router()

SuggestedPeopleRouter.get('/', [
  
], getSuggestedPeople)
