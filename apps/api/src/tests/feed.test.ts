import { beforeAll, describe, it, expect } from 'vitest'
import { api } from './helpers/api'

describe('tests on endpoint: /api/feed', () => {
  let token: string | undefined = undefined

  beforeAll(async () => {
    const res = await api.post('/api/auth/login')
      .send({
        email: 'test01@test.com',
        password: '12345678'
      })
    token = res.body.token
  })

  it('should to get the custom user feed', async () => {
    const res = await api.get('/api/feed')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    
    const { ok, msg, feed } = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('feed cargado')
    expect(feed instanceof Object).toBe(true)

    const posts = Object.values(feed)
    expect(posts instanceof Array).toBe(true)
    expect(posts[0]).toMatchObject({
      type: expect.any(String),
      posts: expect.any(Object)
    })
  })

  it('should to return the public feed (public post)', async () => {
    const res = await api.get('/api/feed/public-posts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const { ok, publicPosts, msg } = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('feed publico cargado')
    expect(publicPosts instanceof Array).toBe(true)
    expect(publicPosts.every(post => post.privacy === 'ALL') ).toBe(true)
  })
})
