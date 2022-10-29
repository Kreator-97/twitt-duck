import { FC, useMemo } from 'react'
import { Box, Grid, Heading } from '@chakra-ui/react'
import { Feed } from '@twitt-duck/state'

import { Comment } from './Comment'
import { Post } from './Post'

interface Props {
  feed: Feed;
}

export const UserFeed: FC<Props> = ({feed}) => {
  
  const feedList = useMemo(() => {
    return Object.values(feed)
  }, [feed])

  return (
    <Grid
      gridTemplateColumns={'1fr'}
      gap='1rem'
    >
      {
        feedList.map((item) => {
          if( item.type === 'repost-comment' ) {
            return (
              <Box
                key={item.comments.originalComment.id}
                bgColor='#fff'
                p='4'
                boxShadow='md'
              >
                <Heading
                  as='h3'
                  fontSize={'md'}
                  color='blue.500'
                  mb='.5rem'
                  fontWeight={400}
                >
                  @{item.comments.author.username} difundió este comentario:
                </Heading>
                <Comment
                  comment={item.comments.originalComment}
                  key={item.comments.id}
                />
              </Box>
            )
          }

          if ( item.type === 'repost' ) {
            return (
              <Box
                key={item.reposts.id}
                bgColor='#fff'
                p='4'
                boxShadow='md'
              >
                <Heading
                  as='h3'
                  fontSize={'md'}
                  color='blue.500'
                  mb='.5rem'
                  fontWeight={400}
                >
                  @{item.reposts.author.username} difundió esta publicación:
                </Heading>
                <Post
                  post={item.reposts.originalPost}
                /> 
              </Box>
            )
          }

          if( item.type === 'post' ) {
            return (
              <Post
                key={item.posts.id}
                post={item.posts}
              />
            )
          }

          return (<div key={Date.now()}></div>)
        })
      }
    </Grid>
  )
}
