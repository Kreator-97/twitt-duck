import { FC, MouseEvent } from 'react'
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

  const onNavigate = (e: MouseEvent) => {
    e.stopPropagation()
    const tagName = (e.target as HTMLDivElement).tagName

    if( tagName === 'DIV' ) {
      navigate(`/post/${post.id}`)
    }
  }

  return (
    <Grid
      className='go-to-post'
      bg='white'
      boxShadow='md'
      gridTemplateColumns='48px 1fr'
      p='.5rem'
      rowGap='.5rem'
      onMouseUp={ onNavigate }
      cursor='pointer'
      transition='background .3s ease-out'
      _hover={{
        backgroundColor: 'rgb(238, 245, 255)'
      }}
    >
      {/* header row */}
      <Box>
        <Avatar
          size='md'
          name={ author.fullname }
          src={ author.profilePic }
        />
      </Box>
      <Box
        data-test-id='post-header'
      >
        <Text
          px='2'
          cursor='pointer'
          fontWeight='bold'
          onClick={ (e) => {
            e.stopPropagation()
            navigate(`/user/${author.username}`)
          }}
          display='inline-block'
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
        <br />
        <Text
          fontWeight='light'
          fontSize='sm'
          display='inline'
          px='2'
        >
          {
            new Date(createdAt).toLocaleDateString()
          }
        </Text>
      </Box>

      {/* content row */}
      <Box />
      <Box>
        <Text
          fontWeight='normal'
          fontSize='md'
          whiteSpace='pre-wrap'
          minH='3rem'
          display='inline-block'
          px='2'
        >
          { content }
        </Text>
      </Box>

      {/* gallery row */}
      <Box
        display={{ base: 'none', md: images.length === 0 ? 'none' : 'block'  }}
      />
      <Box
        display={ images.length === 0 ? 'none' : 'block' }
        gridColumnStart={{ base: 'span 2', md: 'span 1' }}
        onMouseUp={ (e) => e.stopPropagation() }
      >
        <Gallery images={images} />
      </Box>

      {/* footer row */}
      <Box />
      <Box
        onMouseUp={ (e) => e.stopPropagation() }
      >
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
