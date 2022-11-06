import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'

const hash = bcrypt.hashSync('12345678', 10)

const users = [
  {
    email: 'test01@test.com',
    fullname: 'test 01',
    password: hash,
    active: true,
    username: 'test01'
  },
  {
    email: 'test02@test.com',
    fullname: 'test 02',
    password: hash,
    active: true,
    username: 'test02'
  },
  {
    email: 'test03@test.com',
    fullname: 'test 03',
    password: hash,
    active: true,
    username: 'test03'
  },
  {
    email: 'test04@test.com',
    fullname: 'test 04',
    password: hash,
    active: true,
    username: 'test04'
  },
  {
    email: 'test05@test.com',
    fullname: 'test 05',
    password: hash,
    active: true,
    username: 'test05'
  },
]

async function cleanDB () {
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()
}

async function main() {
  await cleanDB()

  await prisma.user.createMany({
    data: users
  })

  const usersDB = await prisma.user.findMany()

  const posts: {content: string, authorId: string, privacy: 'ALL' }[] = [
    {
      content: 'hola',
      authorId: usersDB[0].id,
      privacy: 'ALL',
    },
    {
      content: 'hola amigos',
      authorId: usersDB[0].id,
      privacy: 'ALL',
    },
    {
      content: 'Que onda a todos',
      authorId: usersDB[1].id,
      privacy: 'ALL',
    },
    {
      content: '¿Que hay de nuevo viejo?',
      authorId: usersDB[1].id,
      privacy: 'ALL',
    },
    {
      content: 'Hola mundo',
      authorId: usersDB[2].id,
      privacy: 'ALL',
    },
    {
      content: 'Prueba de una publicación \n Multilinea',
      authorId: usersDB[2].id,
      privacy: 'ALL',
    },
    {
      content: 'Feliz domingo',
      authorId: usersDB[3].id,
      privacy: 'ALL',
    },
    {
      content: 'Este este debería ser un comentario super mega largo pero no se me ocurre que poner',
      authorId: usersDB[3].id,
      privacy: 'ALL',
    },
    {
      content: 'Publicación de relleno',
      authorId: usersDB[4].id,
      privacy: 'ALL',
    },
    {
      content: 'Publicación de relleno 2',
      authorId: usersDB[4].id,
      privacy: 'ALL',
    },
  ]

  await prisma.post.createMany({
    data: posts
  })
}

main().then( () => prisma.$disconnect() )
