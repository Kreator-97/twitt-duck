import { Post, Repost, User } from '@prisma/client'
import { Request, Response } from 'express'
import prisma from '../lib/prisma'

interface Feed {
  [key: string]: FeedItem;
}

type FeedItem = {
  type: 'post';
  posts: Post & { author: User | null; };
} | {
  type: 'repost';
  reposts: Repost & { author: User | null; };
} | {
  type: 'repost-comment';
  comments: Repost & { author: User | null; };
}

export const getUserFeed = async (req: Request, res: Response) => {

  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'userId dentro del token no es válido'
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      followers: true,
      following: true
    }
  })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `usuario con el id ${userId} no encontrado`,
    })
  }

  const followingIds = user.following.map(user => user.followingId)

  const postsPromise = prisma.post.findMany({
    where: {
      OR: [
        {
          authorId: {
            in: followingIds
          }
        },
        {
          authorId: userId
        }
      ]
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true,
      images: true,
      comments: true,
      likes: {
        include: {
          user: true,
        }
      },
      reposts: {
        include: {
          author: true,
          originalComment: true,
          originalPost: true,
        }
      },
    }
  })

  const repostsPromise = prisma.repost.findMany({
    where: {
      authorId: { in: followingIds }
    },
    orderBy: {
      originalPost: {
        createdAt: 'desc'
      }
    },
    include: {
      author: true,
      originalPost: {
        include: {
          author: true,
          comments: true,
          images: true,
          likes: {
            include: {
              user: true,
            }
          },
          reposts: {
            include: {
              author: true,
              originalComment: true,
              originalPost: true,
            }
          },
        }
      }
    }
  })

  const repostsCommentsPromise = await prisma.repost.findMany({
    where: {
      authorId: { in: followingIds }
    },
    orderBy: {
      originalComment: {
        createdAt: 'desc'
      }
    },
    include: {
      author: true,
      originalComment: {
        include: {
          author: true,
          likes: {
            include: {
              user: true,
            }
          },
          post: {
            include: {
              author: true
            }
          },
          reposts: {
            include: {
              author: true,
              originalComment: true,
              originalPost: true,
            }
          }
        }
      },
    }
  })

  const [ followingPosts, followingReposts, followingRepostsComments ] = await Promise.all([postsPromise, repostsPromise, repostsCommentsPromise])

  const posts = followingPosts.reduce((acc: Feed, item) => {
    const date = new Date(item.createdAt).getTime().toString()
    acc[date] = { type: 'post', posts: item }
    return acc
  }, {})

  const reposts = followingReposts.reduce((acc: Feed, item) => {
    if( item.originalPost ) {
      const date = new Date(item.originalPost.createdAt).getTime().toString()
      acc[date] = { type: 'repost', reposts: item }
    }
    return acc
  }, {})

  const comments = followingRepostsComments.reduce((acc: Feed, item) => {
    if( item.originalComment ) {
      const date = new Date(item.originalComment.createdAt).getTime().toString()
      acc[date] = { type: 'repost-comment', comments: item }
    }
    return acc
  }, {})

  const feed: Feed = { ...posts, ...reposts, ...comments }

  return res.status(200).json({
    ok: true,
    msg: 'feed cargado',
    feed,
  })
}

export const usePublicFeed = async (req: Request, res: Response) => {
  const userId = req.userId

  if( !userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'userid dentro del token no es válido'
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      followers: true,
      following: true
    }
  })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `usuario con el id ${userId} no encontrado`,
    })
  }

  const followingIds = user.following.map(user => user.followingId)

  // this gets all public routes that are not included in followings posts
  const otherPublicPosts = await prisma.post.findMany({
    where: {
      privacy: {
        equals: 'ALL'
      },
      authorId: {
        notIn: [...followingIds, userId]
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true,
      images: true,
      comments: true,
      likes: {
        include: {
          user: true,
        }
      },
      reposts: {
        include: {
          author: true,
          originalComment: true,
          originalPost: true,
        }
      },
    }
  })

  return res.status(200).json({
    ok: true,
    msg: 'feed publico cargado',
    publicPosts: otherPublicPosts,
  })
}
