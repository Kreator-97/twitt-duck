import { Router } from 'express'
import { check } from 'express-validator'

import { login, register, renewToken, signInGoogle } from '../controllers/authController'
import { validateFields, verifyUser } from '../middlewares'

export const AuthRouter = Router()

AuthRouter.post('/login', [
  check('email', 'email must to be a valid email').notEmpty().isEmail(),
  check('password', 'password is required').notEmpty(),
  validateFields,
], login)

AuthRouter.post('/register', [
  check('email', 'email must to be a valid email').notEmpty().isEmail(),
  check('fullname', 'email is required').notEmpty(),
  check('username', 'username is required').notEmpty(),
  check('password', 'password is invalid').notEmpty().isLength({min: 8}),
  validateFields,
], register)

AuthRouter.post('/google', [
  check('id_token', 'id_token is required').notEmpty(),
  validateFields,
], signInGoogle)

AuthRouter.post('/renew', [
  verifyUser
], renewToken)
