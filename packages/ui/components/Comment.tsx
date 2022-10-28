import { FC } from 'react'
import { mutate } from 'swr'
import { Link } from 'react-router-dom'
import { Box, Grid, Text } from '@chakra-ui/react'
import { Comment as CommentType, openRemoveRepostModal, Post, useAppDispatch } from '@twitt-duck/state'
import { createRepost, toggleLikeComment } from '@twitt-duck/services'

import { UserAvatar } from './UserAvatar'
import { PostActions } from './PostActions'

interface Props {
  comment: CommentType;
  post?: Post
}

export const Comment: FC<Props> = ({comment, post}) => {
  const dispatch = useAppDispatch()

  const onRepostCancelEvent = async (actionId: string) => {
    dispatch(openRemoveRepostModal(actionId))
  }

  const onCommentLiked = async (actionId: string) => {
    const token = localStorage.getItem('token')

    if( !token ) {
      console.error('token no existe')
      return
    }

    try {
      await toggleLikeComment(actionId, token || '')
      if( post ) {
        mutate(`http://localhost:5000/api/post/${post.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onCommentReposted = async (actionId: string, type: 'comment' | 'post') => {
    const token = localStorage.getItem('token')

    if( !token ) {
      console.error('token no existe')
      return
    }

    try {
      await createRepost(type, actionId, token)
      if( post ) {
        mutate(`http://localhost:5000/api/post/${post.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const { author } = comment
  return (
    <Grid
      p='1rem .5rem'
      border='1px solid #EEE'
      key={comment.id}
      gridTemplateColumns='48px 1fr'
      gap='.5rem'
      alignItems='center'
    >
      <Box>
        <UserAvatar
          imgURL={author.profilePic}
          name={author.fullname}
        />
      </Box>
      <Box>
        <Text>
          { author.fullname + ' - ' }
          <Text color='gray.500' as='span'>@{author.username}
          </Text>
        </Text>
        <Text
          color='gray.500'
        >
          { 'En respuesta a ' }
          <Text
            as='span'
            color='cyan.500'
          >
            <Link to={`/user/${comment.author.username}`}
            > @{ comment.author.username }
            </Link>
          </Text>
        </Text>
      </Box>
      <Box />
      <Box
        minHeight='3rem'
      >
        <Text>{ comment.content }</Text>
      </Box>
      <Box />
      {/* FIXME: fix this on schema */}
      <PostActions
        type='comment'
        onLikeEvent={ onCommentLiked }
        onRepostEvent={ onCommentReposted }
        onRepostCancelEvent={ onRepostCancelEvent }
        actionId={comment.id}
        comments={ [] }
        likes={ comment.likes }
        reposts={ comment.reposts }
      />
    </Grid>
  )
}
