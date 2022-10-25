import { Request, Response } from 'express'
import { Comment } from '@prisma/client'

import prisma from '../lib/prisma'
import { ApiResponse } from '../interfaces'

interface CommentReponse extends ApiResponse {
  comment?: Comment
}

export const AddComment = async (req: Request, res:Response<CommentReponse>) => {
  const postId = req.params.postId
  const { content }= req.body
  const userId = req.userId

  if( content.trim === '' ) {
    return res.status(400).json({
      ok: false,
      msg: 'content no puede estar vácio'
    })
  }

  const user = await prisma.user.findUnique({ where: { id: userId }})

  if( !user ) {
    return res.status(400).json({
      ok: false,
      msg: `No existe el usuario con el id ${userId}`
    })
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: user.id,
        postId,
      }, include: {
        author: true,
      }
    })

    return res.status(201).json({
      msg: 'comentario agregado',
      ok: true,
      comment,
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ocurrio un error al intentar crear el post',
      ok: false
    })
  }



}
