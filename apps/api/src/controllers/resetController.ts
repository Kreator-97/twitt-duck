import { Request, Response } from 'express'
import prisma from '../lib/prisma'

// this endpoint only works on testing
export const resetDB = async (req:Request, res:Response) => {
  const env = process.env.ENVIRONMENT

  if( env !== 'test' ) {
    return res.status(400).json({
      ok: false,
      msg: 'This endpoint only works on testing'
    })
  }

  try {
    await Promise.all([
      prisma.comment.deleteMany({}),
      prisma.repost.deleteMany({}),
      prisma.likes.deleteMany({}),
      prisma.notification.deleteMany({}),
    ])

    return res.status(202).json({ ok :true, msg: 'DB reseted' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'An error occurred when attempting to delete notifications'
    })
  }
}
