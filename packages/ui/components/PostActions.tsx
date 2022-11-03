import { FC, MouseEvent, useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Flex, useToast } from '@chakra-ui/react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { HiOutlineHeart } from 'react-icons/hi'

import {
  Comment,
  Like,
  NotificationPayload,
  openRemoveRepostModal,
  Repost,
  SocketContext,
  useAppDispatch,
  useAppSelector
} from '@twitt-duck/state'

import {
  createRepost,
  mutate,
  toggleLikeComment,
  toggleLikePost
} from '@twitt-duck/services'

import { PostIcon } from './'

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
  const { socket } = useContext(SocketContext)
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)
  const toast = useToast()

  const isRepostActive = useMemo(() => reposts.some( repost => repost.author.id === user?.id), [reposts])
  const isLikeActive = useMemo(() => likes.some( like => like.user.id === user?.id), [reposts])

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

      const notification: NotificationPayload = {
        msg: 'nueva notificación',
        id: actionId,
        type,
        isNew: !isLikeActive,
      }

      socket?.emit('user-notification-like', notification)
      mutate(pathname)
    } catch (error) {
      console.log(error)
    }
  }

  const onRepost = async (e: MouseEvent<HTMLDivElement> ) => {
    e.stopPropagation()
    if( isRepostActive ) {
      console.log({isActive: isRepostActive})
      dispatch(openRemoveRepostModal(actionId))
      return
    }

    const token = localStorage.getItem('token')

    try {
      await createRepost(type, actionId, token || '')

      mutate(pathname)

      toast({
        title: 'Has difundido esta publicación',
        position: 'top',
        isClosable: true,
        status: 'success',
        duration: 3000,
      })

      const notification: NotificationPayload = {
        msg: 'nueva notificación',
        id: actionId,
        type,
        isNew: !isLikeActive,
      }

      socket?.emit('user-notification-repost', notification)
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
          active={ isRepostActive }
          icon={ AiOutlineRetweet }
          title='Difundir'
          count={ reposts.length }
          onClick={ onRepost }
        />
      </Box>
      <Box>
        <PostIcon
          active={ isLikeActive }
          icon={ HiOutlineHeart }
          title='Me gusta'
          count={ likes.length }
          onClick={ onLikePost }
        />
      </Box>
    </Flex>
  )
}
