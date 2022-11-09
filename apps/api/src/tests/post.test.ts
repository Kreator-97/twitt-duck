import { beforeAll, describe, expect, it  } from 'vitest'
import prisma from '../lib/prisma'
import { api } from './helpers/api'

describe('test on endpoint: /api/post/', async () => {
  let token: string | undefined = undefined
  const anyPost = await prisma.post.findFirst({where: { author: { email: 'test05@test.com' }}})

  beforeAll(async () => {
    const response = await api.post('/api/auth/login').send({email: 'test05@test.com', password: '12345678'})
    token = response.body.token
  })

  it('should to get a post by id correctly', async () => {
    const postDB = await prisma.post.findFirst()
    
    const res = await api.get(`/api/post/${postDB.id}`).expect(200)

    const { post, ok } = res.body
    expect(ok).toBe(true)
    expect(post).toMatchObject({
      id        : expect.any(String),
      content   : expect.any(String),
      visibility: expect.any(String),
      createdAt : expect.any(String),
      privacy   : expect.any(String),
      author    : expect.any(Object),
      images    : expect.any(Array),
      likes     : expect.any(Array),
      reposts   : expect.any(Array),
      comments  : expect.any(Array),
    })
  })

  it('should to return 404 status code when posts not found', async () => {
    const id = 'asfsfkjfaskdjhf'
    const res = await api.get(`/api/post/${id}`).expect(404)

    const { ok, msg } = res.body
    expect(ok).toBe(false)
    expect(msg).toBe(`No existe el post con el id ${id}`)
  })

  it('should to return all the post by a specific user', async () => {
    const username = 'test02'
    const userPosts = await prisma.post.findMany({
      where: { author: { username } }
    })

    const res = await api.get(`/api/post/user/${username}`).expect(200)

    const { ok, posts } = res.body

    expect(ok).toBe(true)
    expect(posts.length).toBe(userPosts.length)
    expect(posts[0].author.username).toBe(username)
  })

  it('should to return a 404 status code when user does not exist', async () => {
    const res = await api.get('/api/post/user/any-user').expect(404)

    const { ok, msg } = res.body

    expect(ok).toBe(false)
    expect(msg).toBe('No existe el usuario con el username any-user')
  })

  it('should to create a user correctly', async () => {
    const postToCreate = { content: 'Este es un post de prueba', images: [] }

    const res = await api.post('/api/post')
      .set('Authorization', `Bearer ${token}`)
      .send(postToCreate)
      .expect(201)

    const { ok, msg, post } = res.body  

    expect(ok).toBe(true)
    expect(msg).toBe('Nuevo post creado')
    expect(typeof post).toBe('object')
    expect(post.content).toBe(postToCreate.content)

    // delete the previous post created
    await prisma.post.delete({where: { id: post.id }})
  })

  it('should to receive a 400 status code when images is not an Array', async () => {
    const postToCreate = { content: 'Este es un post de prueba', images: {} }

    const res = await api.post('/api/post')
      .set('Authorization', `Bearer ${token}`)
      .send(postToCreate)
      .expect(400)

    const { ok, msg } = res.body

    expect(ok).toBe(false)
    expect(msg).toBe('El parámetro images debe de ser un Array')
  })

  it('should to receive a 400 status code when values on images are not a valid url', async () => {
    const postToCreate = { content: 'Este es un post de prueba', images: ['123123', 47474, {}] }

    const res = await api.post('/api/post')
      .set('Authorization', `Bearer ${token}`)
      .send(postToCreate)
      .expect(400)

    const { ok, msg } = res.body

    expect(ok).toBe(false)
    expect(msg).toBe('Los valores en images deben de ser válidos')
  })

  it('toggle-like endpoint should to work correctly', async () => {
    const res = await api.put(`/api/post/${anyPost.id}/toggle-like`)
      .set('Authorization', `Bearer ${token}`)

    const { ok, msg } = res.body
    expect(ok).toBe(true)
    expect(msg).toBe('Al usuario le ha gustado esta publicación')

    // repeat to toggle action
    const res2 = await api.put(`/api/post/${anyPost.id}/toggle-like`)
      .set('Authorization', `Bearer ${token}`)
    
    const body = res2.body
    expect(body.ok).toBe(true)
    expect(body.msg).toBe('Al usuario ya no le gusta esta publicación')
  })

  it('should to update the privacy by a post correctly', async () => {
    const privacy = 'ONLY_FOLLOWERS'
    const res = await api.put(`/api/post/${anyPost.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({privacy})

    const { ok, msg } = res.body

    console.log(res.body)
    expect(ok).toBe(true)
    expect(msg).toBe(`Privacidad del post configurada en '${privacy}'`)
  })

  it('should to receive a 400 status code when post privacy value sent is not valid', async () => {
    const res = await api.put(`/api/post/${anyPost.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({privacy: 'NO-A-VALID-PRIVACY-VALUE'})

    const { ok, msg } = res.body
    expect(ok).toBe(false)
    expect(msg).toBe('Los unicos valores permitidos son: ONLY_ME, ONLY_FOLLOWERS, ALL')
  })
})
