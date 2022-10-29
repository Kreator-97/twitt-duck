import { FC } from 'react'
import { Avatar, Box, Text, Grid } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Post as PostType } from '@twitt-duck/state'

import { Gallery, PostActions } from '.'

interface Props {
  post: PostType;
}

export const Post: FC<Props> = ({ post }) => {
  const navigate = useNavigate()

  const { author, content, likes, comments, reposts, createdAt, images } = post

  return (
    <Grid
      bg='white'
      boxShadow='md'
      gridTemplateColumns='48px 1fr'
      p={{ base: '.5rem', lg: '.5rem' }}
      rowGap={{ base: '.5rem', lg: '.5rem' }}
      columnGap={{ base: '.5rem', lg: '.5rem' }}
      onClick={ () => navigate(`/post/${post.id}`) }
      cursor='pointer'
      transition='background .3s ease-out'
      _hover={{
        backgroundColor: '#EEE'
      }}
    >
      <Box width='48px'>
        <Avatar
          size='md'
          name={ author.fullname }
          src={ author.profilePic }
        />
      </Box>
      <Box>
        <Text
          cursor='pointer'
          fontWeight='bold'
          onClick={ (e) => {
            e.stopPropagation()
            navigate(`/user/${author.username}`)
          }}
          display='inline'
          _hover={{
            textDecoration: 'underline'
          }}
        > {author.fullname + ' -'}
          <Text as={'span'}
            fontSize='base'
            fontWeight='light'
            color='gray.500'
          > @{author.username} </Text>
        </Text>
        <Text
          fontWeight='light'
          fontSize='sm'
          display='block'
        >
          {
            new Date(createdAt).toLocaleDateString()
          }
        </Text>
      </Box>
      <Box gridRowStart={ images.length === 0 ? 'span 1' : 'span 2'} />
      <Box>
        <Text
          fontWeight='normal'
          fontSize='md'
          whiteSpace='pre-wrap'
          minH='3rem'
          onClick={ (e) => e.stopPropagation() }
        >
          { content }
        </Text>
      </Box>
      {
        images.length > 0 && (
          <Gallery images={images} />
        )
      }
      <Box />
      <Box>
        <PostActions
          type='post'
          actionId={post.id}
          comments={comments}
          likes={likes}
          reposts={reposts}
        />
      </Box>
    </Grid>
  )
}
