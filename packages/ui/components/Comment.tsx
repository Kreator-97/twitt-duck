import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Grid, Text } from '@chakra-ui/react'
import { Comment as CommentType } from '@twitt-duck/state'

import { PostActions, UserAvatar } from './'

interface Props {
  comment: CommentType;
}

export const Comment: FC<Props> = ({comment}) => {
  const navigate = useNavigate()
  const { author } = comment

  const replyTo = comment.post?.author.username || comment.comment?.author.username || ''

  return (
    <Grid
      bgColor='#fff'
      p='1rem .5rem'
      border='1px solid #EEE'
      key={comment.id}
      gridTemplateColumns='48px 1fr'
      gap='.5rem'
      alignItems='center'
      transition='background .3s ease-out'
      cursor='pointer'
      onClick={ () => navigate(`/comment/${comment.id}`) }
      _hover={{
        backgroundColor: 'rgb(238, 245, 255)'
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
            color='blue.500'
          >
            <Link to={`/user/${replyTo}`}
            > @{ replyTo }
            </Link>
          </Text>
        </Text>
      </Box>
      <Box />
      <Box minHeight='3rem'>
        <Text whiteSpace='pre'>{ comment.content }</Text>
      </Box>
      <Box />
      <PostActions
        type='comment'
        actionId={ comment.id }
        comments={ comment.comments }
        likes={ comment.likes }
        reposts={ comment.reposts }
      />
    </Grid>
  )
}
