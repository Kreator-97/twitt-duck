import { Request, Response } from 'express'
import { Repost } from '@prisma/client'

import prisma from '../lib/prisma'
import { ApiResponse } from '../interfaces'

interface RepostResponse extends ApiResponse {
  repost?: Repost;
}

const VALID_REPOST_TYPES = ['post','comment']

export const createRepost = async (req: Request, res: Response<RepostResponse>) => {
  const userId = req.userId
  const { type, postId } = req.body

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'userId dentro de token no fue encontrado'
    })
  }

  if( !VALID_REPOST_TYPES.includes(type) ) {
    return res.status(400).json({
      ok: false,
      msg: `type solo puede ser algunos de los siguientes valores: ${VALID_REPOST_TYPES.join(', ')}`
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId } 
  })

  if( !user ) {
    return res.status(404).json({
      msg: `usuario con el id ${userId} no fue encontrado`,
      ok: false,
    })
  }

  const isRepostsExist = await prisma.repost.findFirst({
    where: {
      OR: [
        {
          originalPostId: postId,
        },
        {
          originalCommentId: postId,
        }
      ]
    }
  })

  if( isRepostsExist ) {
    return res.status(400).json({
      ok: false,
      msg: 'El usuario ya difundió esta publicación'
    })
  }

  try {
    let repost: Repost | undefined

    if( type === 'post' ) {
      repost = await prisma.repost.create({
        data: {
          authorId: userId,
          originalPostId: postId,
        }
      })
    }
    if( type === 'comment' ) {
      repost = await prisma.repost.create({
        data: {
          authorId: userId,
          originalCommentId: postId,
        }
      })
    }
    
    return res.status(201).json({
      ok: true,
      msg: 'ok',
      repost,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: 'Ocurrio un error al intentar crear el repost',
      ok: false
    })
  }
}
