import { beforeAll, describe, expect, it } from 'vitest'
import prisma from '../lib/prisma'
import { api } from './helpers/api'

describe('tests on endpoint: /api/repost', async () => {
  let token: string | undefined = undefined
  const anyPost = await prisma.post.findFirst()

  beforeAll(async () => {
    const response = await api.post('/api/auth/login').send({email: 'test05@test.com', password: '12345678'})
    token = response.body.token
  })

  it('should to create a repost correctly', async () => {
    const body = { postId: anyPost.id, type: 'post' }

    const res = await api.post('/api/repost')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201)

    const { ok, msg, repost } = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('repost creado')
    expect(repost.originalPostId).toBe(anyPost.id)
  })

  it('should to receive a 400 status code when user already repost the same post', async () => {
    // this test is similar to the previous
    const body = { postId: anyPost.id, type: 'post' }

    const res = await api.post('/api/repost')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(400)

    const { ok, msg } = res.body
    expect(ok).toBe(false)
    expect(msg).toBe('El usuario ya difundió esta publicación')
  })

  it('should to delete a repost correctly', async () => {
    const previousRepost = await prisma.repost.findFirst({where: { originalPostId: anyPost.id }})

    const res = await api.delete(`/api/repost/${previousRepost.originalPostId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const { ok, msg } = res.body

    expect(ok).toBe(true)
    expect(msg).toBe('Repost ha sido eliminado')
  })
})
