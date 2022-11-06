import { it, describe, beforeAll, expect } from 'vitest'
import { api } from './helpers/api'

describe('tests on endpoint: /api/suggested-people', async () => {
  let token: string | undefined = undefined

  beforeAll(async () => {
    const response = await api.post('/api/auth/login').send({email: 'test05@test.com', password: '12345678'})
    token = response.body.token
  })

  it('should to get the suggested people to follow', async () => {
    const res = await api.get('/api/suggested-people')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const { ok, msg, users } = res.body

    expect(ok).toBe(true)
    expect(msg).toBe('usuarios encontrados')
    expect(users instanceof Array).toBe(true)
  })
})
