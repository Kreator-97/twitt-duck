import { Request, Response } from 'express'

import prisma from '../lib/prisma'
import { ApiResponse } from '../interfaces'
import { Comment } from '@prisma/client'

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

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'userId no fue proporcionado en el token'
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
        authorId: userId,
        postId
      }
    })

    return res.status(201).json({
      msg: 'comentario agregado',
      ok: true,
      comment: comment,
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Ocurrio un error al intentar crear el post',
      ok: false
    })
  }
}

export const toggleLikeComment = async (req: Request, res: Response) => {
  const userId = req.userId
  const commentId = req.params.commentId

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'userId dentro de token no encontrado'
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `no existe el usuario con el id ${userId}`
    })
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      likes: true
    }
  })

  if( !comment ) {
    return res.status(404).json({
      ok: false,
      msg: `no existe el comentario con el id ${commentId}`
    })
  }

  const isUserLikedThisCommentPreviously = comment.likes.find( like => like.userId === userId )

  try {
    if( isUserLikedThisCommentPreviously ) {
      const likeIdToDelete = isUserLikedThisCommentPreviously.id
      await prisma.likes.delete({ where: { id: likeIdToDelete }})
      
      return res.status(200).json({
        ok: true,
        msg: 'Al usuario ya no le gusta este comentario'
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrio un error al intentar remover el ‘me gusta’'
    })
  }

  try {
    await prisma.likes.create({
      data: {
        commentId,
        userId
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'Al usuario le ha gustado este comentario'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrio un error al intentar agregar el ‘me gusta’'
    })
  }
}
