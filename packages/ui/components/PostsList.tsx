import { FC } from 'react'
import { Box, Grid, Heading } from '@chakra-ui/react'
import { Post as PostType } from '@twitt-duck/state'

import { Post } from '.'

interface Props {
  posts: PostType[];
  showFeedMessage?: boolean;
}

export const PostsList: FC<Props> = ({posts, showFeedMessage = false}) => {

  return (
    <Grid
      gridTemplateColumns='1fr'
      gap='1rem'
    >
      {
        showFeedMessage && (
          <Box
            boxShadow='md'
            bgColor='#fff'
          >
            <Heading
              textAlign='center'
              padding='1rem'
              as='h3'
              fontWeight='400'
              fontSize='md'
            >
              Personaliza tu feed siguiendo a las personas que más te interesan
            </Heading>
          </Box>
        )
      }
      {
        posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
            />
          )
        })
      }
    </Grid>
  )
}
