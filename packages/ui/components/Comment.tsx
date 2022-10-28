import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Text } from '@chakra-ui/react'
import { Comment as CommentType, Post } from '@twitt-duck/state'

import { UserAvatar } from './UserAvatar'
import { PostActions } from './PostActions'

interface Props {
  comment: CommentType;
  post?: Post
}

export const Comment: FC<Props> = ({comment}) => {

  const { author } = comment
  return (
    <Grid
      p='1rem .5rem'
      border='1px solid #EEE'
      key={comment.id}
      gridTemplateColumns='48px 1fr'
      gap='.5rem'
      alignItems='center'
      transition='background .3s ease-out'
      cursor='pointer'
      _hover={{
        backgroundColor: '#EEE'
      }}
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
        actionId={comment.id}
        comments={ [] }
        likes={ comment.likes }
        reposts={ comment.reposts }
      />
    </Grid>
  )
}
