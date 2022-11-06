// import supertest from 'supertest'
import { expect, describe, it, beforeAll } from 'vitest'
import prisma from '../lib/prisma'
import { api } from './helpers/api'

describe('test on /api/user/ endpoint', async () => {

  let token = undefined
  const updateUser = {
    fullname: 'test 05 - updated',
    description: 'Biografia del usuario actualizada',
    username: 'test05-updated'
  }

  beforeAll(async () => {
    const response = await api.post('/api/auth/login').send({email: 'test05@test.com', password: '12345678'})
    token = response.body.token
  })

  it('should to return the info by a user', async () => {
    const response = await api
      .get('/api/user/info/test02')

    const { posts, images, likes } = response.body
    expect( posts instanceof Array ).toBe(true)
    expect( likes instanceof Array ).toBe(true)
    expect( images instanceof Array ).toBe(true)

    expect(posts.length).toBe(2)
  })

  it('should to return a user by username', async () => {
    const { body } = await api.get('/api/user/test02')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const user = body.user
    expect(user instanceof Object).toBe(true)
    expect(user).toMatchObject({
      active        : expect.any(Boolean),
      email         : expect.any(String),
      followers     : expect.any(Array),
      following     : expect.any(Array),
      fullname      : expect.any(String),
      id            : expect.any(String),
      online        : expect.any(Boolean),
      password      : expect.any(String),
      profilePic    : expect.any(String),
      provider      : expect.any(String),
      role          : expect.any(String),
      username      : expect.any(String),
    })
  })

  it('update user', async () => {
    const response = await api.put('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .send(updateUser)
      .expect(202)

    const { ok, user } = response.body

    expect(ok).toBe(true)
    expect(user.fullname).toBe(updateUser.fullname)
    expect(user.username).toBe(updateUser.username)
    expect(user.description).toBe(updateUser.description)
  })

  it('got 404 on update a user which username is not availible', async () => {
    const anyUser = await prisma.user.findFirst({})

    const response = await api.put('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .send({...updateUser, username: anyUser.username})
      .expect(400)

    const { ok, msg } = response.body

    expect(ok).toBe(false)
    expect(msg).toBe('Este nombre de usuario fue tomado previamente')
  })

  it('should to change password correctly', async () => {
    const currentPassword = '12345678'
    const newPassword = '87654321'

    const res = await api.put('/api/user/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({currentPassword, newPassword})
      .expect(202)

    const { ok, msg } = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('Contraseña actualizada correctamente')

    // revert password to pass test each time running
    await api.put('/api/user/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({currentPassword: newPassword, newPassword: currentPassword})
      .expect(202)
  })

  it('change background picture should to change the img correctly', async () => {
    const imgURL = 'https://res.cloudinary.com/kreator/image/upload/v1667165895/twitt-duck/media/images/vy86zcqtvn7qgs0yootp.jpg'
    const res = await api.put('/api/user/change-background-picture')
      .set('Authorization', `Bearer ${token}`)
      .send({
        'backgroundPic': imgURL
      })
      .expect(202)
    
    const { ok, imgURL: imgUpdated } = res.body
    expect(ok).toBe(true)
    expect(imgURL).toBe(imgUpdated)
  })
})

