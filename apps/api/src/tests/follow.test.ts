import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import prisma from '../lib/prisma'
import { api } from './helpers/api'

describe('tests on endpoint: /api/follow', () => {
  let token: string | undefined = undefined

  beforeAll(async () => {
    const res = await api.post('/api/auth/login')
      .send({
        email: 'test01@test.com',
        password: '12345678'
      })
    token = res.body.token
  })

  it('should to create a follow by a user', async() => {
    const res = await api.post('/api/follow/test03')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const { msg, ok } = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('Follow realizado correctamente')
  })

  it('should to get all the followers and following by a username', async () => {
    const res = await api.get('/api/follow/test01')
      .expect(200)

    const { ok, msg, followers, following } = res.body

    expect(ok).toBe(true)
    expect(msg).toBe('exitoso')
    expect(followers instanceof Array ).toBe(true)
    expect(following instanceof Array ).toBe(true)

    // in the previous test, we did the next: test01 following to test03
    expect(following[0].followingTo.username).toBe('test03')

    // check the status of the other user
    const res2 = await api.get('/api/follow/test03')

    const body = res2.body
    expect(body.ok).toBe(true)

    // we expect that the user test03 has 1 follower
    expect(body.followers instanceof Array ).toBe(true)
    expect(body.followers.length).toBe(1)
    expect(body.followers[0].user.username).toBe('test01')
  })
})

afterAll( async () => {
  await prisma.follow.deleteMany()
})
