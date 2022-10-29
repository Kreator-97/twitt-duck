import { FC, MouseEvent, useMemo } from 'react'
import { mutate } from 'swr'
import { useLocation } from 'react-router-dom'
import { Box, Flex, useToast } from '@chakra-ui/react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { HiOutlineHeart } from 'react-icons/hi'

import {
  Comment,
  Like,
  openRemoveRepostModal,
  Repost,
  useAppDispatch,
  useAppSelector
} from '@twitt-duck/state'

import {
  createRepost,
  toggleLikeComment,
  toggleLikePost
} from '@twitt-duck/services'

import { PostIcon } from './PostIcon'

interface Props {
  comments  : Comment[];
  likes     : Like[];
  reposts   : Repost[];
  actionId  : string;
  type      : 'comment' | 'post';
  onRepostSuccess ?: () => void;
  onLikeSuccess   ?: () => void;
}

export const PostActions: FC<Props> = ({ comments, likes, reposts, actionId, type }) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const toast = useToast()

  const repostActive = useMemo(() => reposts.some( repost => repost.author.id === user?.id), [reposts])

  const onLikePost = async (e: MouseEvent<HTMLDivElement> ) => {
    e.stopPropagation()
    const token = localStorage.getItem('token')

    try {
      if( type === 'post' ) {
        await toggleLikePost(actionId, token || '')
      }
      if( type === 'comment' ) {
        await toggleLikeComment(actionId, token || '')
      }
      mutate('http://localhost:5000/api/post/')
      mutate(['http://localhost:5000/api/feed/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }])

      if( pathname.startsWith('/post/') ) {
        const URLToReload = `http://localhost:5000/api${pathname}`
        mutate(URLToReload)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onRepost = async (e: MouseEvent<HTMLDivElement> ) => {
    e.stopPropagation()

    if( repostActive ) {
      dispatch(openRemoveRepostModal(actionId))
      return
    }

    const token = localStorage.getItem('token')

    try {
      await createRepost(type, actionId, token || '')

      mutate('http://localhost:5000/api/feed/public-posts')
      mutate(['http://localhost:5000/api/feed/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }])

      if( pathname.startsWith('/post/') ) {
        const URLToReload = `http://localhost:5000/api${pathname}`
        mutate(URLToReload)
      }

      toast({
        title: 'Has difundido esta publicación',
        position: 'top',
        isClosable: true,
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex
      gap='1rem'
      justify='space-evenly'
      alignItems='center'
      margin='0 auto'
      maxWidth='600px'
      width='100%'
    >
      <Box>
        <PostIcon
          icon={ BiCommentDetail }
          title='Comentar'
          count={ comments ? comments.length : 0 }
        />
      </Box>
      <Box>
        <PostIcon
          active={ repostActive }
          icon={ AiOutlineRetweet }
          title='Difundir'
          count={ reposts.length }
          onClick={ onRepost }
        />
      </Box>
      <Box>
        <PostIcon
          active={ likes.some( like => like.user.id === user?.id) }
          icon={ HiOutlineHeart }
          title='Me gusta'
          count={ likes.length }
          onClick={ onLikePost }
        />
      </Box>
    </Flex>
  )
}
