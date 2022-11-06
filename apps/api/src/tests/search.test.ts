import { describe, it, expect } from 'vitest'
import { api } from './helpers/api'

describe('test on search endpoint', () => {
  it('result are returned as json', async () => {
    await api.get('/api/search/prueba')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('should to return users and posts on results', async () => {
    const response = await api.get('/api/search/hola mundo')
    const { users, posts, ok } = response.body
    expect(ok).toBe(true)
    expect(users instanceof Array).toBe(true)
    expect(posts instanceof Array).toBe(true)
  })

  it('should to return 5 user called test', async () => {
    const response = await api
      .get('/api/search/test')
      .expect(200)

    const { users } = response.body
    expect(users instanceof Array).toBe(true)
    expect(users.length).toBe(5)
  })

  it('should to return 5 user called test', async () => {
    const response = await api
      .get('/api/search/test')
      .expect(200)

    const { users } = response.body
    expect(users instanceof Array).toBe(true)
    expect(users.length).toBe(5)
  })
})
