import { Router } from 'express'
import { param } from 'express-validator'
import { searchQuery } from '../controllers/searchController'
import { validateFields } from '../middlewares'

export const SearchRouter = Router()

SearchRouter.get('/:query', [
  param('query', 'query param es requerido').notEmpty(),
  validateFields,
], searchQuery)
