import { afterAll, describe, expect, it } from 'vitest'
import prisma from '../lib/prisma'

import { api } from './helpers/api'

describe('test on endpoint: /api/auth/', async () => {
  const user = await prisma.user.findFirst()
  let tokenFromUserNotActivated: undefined | string = undefined

  it('should to register a new user correctly', async () => {
    const newUser = {
      fullname: 'new user',
      email: 'newuser01@test.com',
      password: '12345678',
    }

    const res = await api.post('/api/auth/register')
      .send(newUser)
      .expect(201)

    const { ok, msg, user, token } = res.body
    tokenFromUserNotActivated = token

    expect(ok).toBe(true)
    expect(msg).toBe('Usuario nuevo creado')
    expect(user).toBeTruthy()
    expect(typeof token).toBe('string')
  })

  it('should to return 400 status code when email was already registered', async () => {
    const emailNotAvailible = user.email

    const newUser = {
      fullname: 'new user2',
      email: emailNotAvailible,
      password: '12345678',
    }

    const res = await api.post('/api/auth/register')
      .send(newUser)
      .expect(400)

    const { msg, ok } = res.body
    expect(ok).toBe(false)
    expect(msg).toBe('Este correo ya existe')
  })

  it('should to activate a user correctly', async () => {
    // when a user is created still is not activated
    // in this endpoint we valid the username by a user
    const res = await api.post('/api/auth/active-user')
      .set('Authorization', `Bearer ${tokenFromUserNotActivated}`)
      .send({ username: 'newUser01' })
      .expect(200)

    const { msg, ok, token, user } = res.body

    expect(ok).toBe(true)
    expect(msg).toBe('Se ha finalizado el perfil del usuario')
    expect(typeof token).toBe('string')
    expect(typeof user).toBe('object')
  })

  it('user should to login correctly', async () => {
    const userLogin = { email: 'newuser01@test.com', password: '12345678' }
    const res = await api.post('/api/auth/login').send(userLogin).expect(200)

    const { ok, msg, token, user } = res.body

    expect(ok).toBe(true)
    expect(msg).toBe('Inicio de sesión exitoso')
    expect(typeof token).toBe('string')
    expect(typeof user).toBe('object')
    expect(user.email).toBe(userLogin.email)
  })

  it('should to receive a 404 status code when email is not valid', async () => {
    const userLogin = { email: 'fakeemail@test.com', password: 'incorrectpassword'}

    const res = await api.post('/api/auth/login').send(userLogin).expect(404)
    const { ok, msg } = res.body

    expect(ok).toBe(false)
    expect(msg).toBe(`Usuario con email ‘${userLogin.email}’ no existe`)
  })

  it('should to receive a 400 status code when password is not valid', async () => {
    const userLogin = { email: 'newuser01@test.com', password: 'incorrectpassword'}

    const res = await api.post('/api/auth/login').send(userLogin).expect(400)
    const { ok, msg } = res.body

    expect(ok).toBe(false)
    expect(msg).toBe('Error de credenciales')
  })
})

afterAll( async () => {
  // reset db changes
  await prisma.user.delete({
    where: {email: 'newuser01@test.com'}
  })
})

