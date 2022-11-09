import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import prisma from '../lib/prisma'
import { api } from './helpers/api'

describe('tests on endpoint: /api/comment', async () => {
  let token: string | undefined = undefined
  const anyPost = await prisma.post.findFirst()

  beforeAll(async () => {
    const response = await api.post('/api/auth/login').send({email: 'test05@test.com', password: '12345678'})
    token = response.body.token
  })

  it('should to create a comment correctly', async () => {
    const comment = { content: 'Este es el comentario de un post' }

    const res = await api.post(`/api/comment/${anyPost.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(comment).expect(201)

    const { msg, ok } = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('comentario agregado')
  })

  it('should to get a comment by its id correctly', async () => {
    const anyComment = await prisma.comment.findFirst()

    const res = await api.get(`/api/comment/${anyComment.id}`).expect(200)
    const { ok, comment } = res.body

    expect(ok).toBe(true)
    expect(comment).toMatchObject({
      id        : expect.any(String),
      content   : expect.any(String),
      visibility: expect.any(String),
      createdAt : expect.any(String),
      privacy   : expect.any(String),
      author    : expect.any(Object),
      post      : expect.any(Object),
      likes     : expect.any(Array),
      reposts   : expect.any(Array),
      comments  : expect.any(Array),
    })
  })

  it('should to toggle the like by a comment', async () => {
    const anyComment = await prisma.comment.findFirst()
    const res = await api.put(`/api/comment/${anyComment.id}/toggle-like`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    
    const { ok, msg } = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('Al usuario le ha gustado este comentario')

    // repeat to toggle action
    const res2 = await api.put(`/api/comment/${anyComment.id}/toggle-like`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    
    const body = res2.body
    expect(body.ok).toBe(true)
    expect(body.msg).toBe('Al usuario ya no le gusta este comentario')
  })

  it('should to create a subcomment correctly', async () => {
    const anyComment = await prisma.comment.findFirst()

    const subcomment = {
      content: 'Este es un subcomentario',
      commentId: anyComment.id
    }

    const res = await api.post('/api/comment/subcomment')
      .set('Authorization', `Bearer ${token}`)
      .send(subcomment)
      .expect(201)
    
    const {ok, msg, comment} = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('subcomentario creado')
    expect(comment instanceof Object).toBe(true)
    expect(comment.content).toBe(subcomment.content)

    // delete previous subcomment created to avoid side effects
    await prisma.comment.delete({
      where: { id: comment.id }
    })
  })

  afterAll( async () => {
    await prisma.comment.deleteMany()
  })
})

