import { Box, Grid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Comment, Post } from '@twitt-duck/state'
import { FC } from 'react'
import { PostActions, UserAvatar } from '.'

interface Props {
  comments: Comment[]
  onCommentLiked: (actionId:string) => void
  post: Post
}

export const CommentsList: FC<Props> = ({comments, post, onCommentLiked}) => {
  return (
    <Box
      bgColor='white'
      boxShadow='md'
    >
      {
        comments.map( comment => {
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
                    <Link to={`/user/${post.author.username}`}
                    > @{ post.author.username }
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
                onLikeEvent={ onCommentLiked }
                actionId={comment.id}
                comments={ [] }
                likes={ comment.likes }
                reposts={0}
              />
            </Grid>
          )
        })
      }
    </Box>
  )
}
