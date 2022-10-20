import { Request, Response } from 'express'
import { Post } from '@prisma/client'

import prisma from '../lib/prisma'
import { ApiResponse } from '../interfaces'

interface PostResponse extends ApiResponse {
  post  ?: Post
  posts ?: Post[]
}

const PRIVACY_VALUES = [ 'ONLY_ME', 'ONLY_FOLLOWERS', 'ALL' ]

export const getAllPosts = async (req: Request, res: Response<PostResponse >) => {
  const posts = await prisma.post.findMany({
    include: { author: true, images: true },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json({
    ok : true,
    msg: 'posts found',
    posts
  })
}

export const getPostsByUsername = async (req: Request, res: Response<PostResponse >) => {
  const username = req.params.username.toString()

  const posts = await prisma.post.findMany({
    where: { author: { username } },
    include: { author: true, images: true },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json({
    ok : true,
    msg: 'post found',
    posts
  })
}

export const createPost = async (req: Request, res: Response<PostResponse> ) => {
  const { content, privacy: privacyTemp, images } = req.body

  let privacy = privacyTemp
  if( !PRIVACY_VALUES.includes(privacyTemp) ) {
    privacy = 'ALL'
  }

  if( !(images instanceof Array) ) {
    return res.status(400).json({
      ok: false,
      msg: 'images on req.body must to be a instance of Array'
    })
  }

  const userId = req.userId

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: 'User request does not exist'
    })
  }

  const post = await prisma.post.create({ data: {
    content,
    privacy,
    authorId: user.id,
    images: {
      createMany: {
        data: images.map(img => ({url: img}))
      }
    }
  }})

  return res.status(200).json({
    ok : true,
    msg: 'New post created',
    post,
  })
}

export const updatePostPrivacy = async (req: Request, res: Response<PostResponse>) => {

  const { privacy } = req.body
  const { postId } = req.params

  if( !PRIVACY_VALUES.includes(privacy) ) {
    return res.status(400).json({
      ok: false,
      msg: 'the only privacy values permited are: ' + PRIVACY_VALUES.join(', ')
    })
  }

  const post = await prisma.post.findUnique({ where: { id: postId }})

  if( !post ) {
    return res.status(404).json({
      ok: false,
      msg: `post with id "${postId}" does not exist`
    })
  }

  if( req.userId !== post.authorId ) {
    return res.status(403).json({
      ok: false,
      msg: 'this user cannot perform this operation'
    })
  }

  await prisma.post.update({ where: { id: postId },
    data: {
      privacy
    }
  })

  return res.status(200).json({
    ok: true,
    msg: `privacy post set on '${privacy}'`
  })
}

// export const DeletePost = (req: Request, res: Response) => {


//   return res.status(200).json({
//     ok: true,
//     msg: 'post deleted'
//   })
// }
