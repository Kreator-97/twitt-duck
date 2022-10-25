import { FC } from 'react'
import { Avatar, Box, Text, Grid } from '@chakra-ui/react'
import { AspectRatio } from '@chakra-ui/react'
import { openVisorImage, Post as PostType, useAppDispatch} from '@twitt-duck/state'
import { useNavigate } from 'react-router-dom'

import { PostActions } from './PostActions'

interface Props {
  post: PostType;
  onLikeCompleted?: () => void;
}

export const Post: FC<Props> = ({post, onLikeCompleted}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { author, content, likes, comments, reposts, createdAt, images } = post

  const onOpenImage = (imageURL: string) => {
    dispatch(openVisorImage(imageURL))
  }
  
  return (
    <Grid
      bg='white'
      mb={{ base: '4' }}
      boxShadow='base'
      gridTemplateColumns='48px 1fr'
      p={{ base: '.5rem', lg: '.5rem' }}
      rowGap={{ base: '.5rem', lg: '.5rem' }}
      columnGap={{ base: '.5rem', lg: '.5rem' }}
      onClick={ () => navigate(`/post/${post.id}`) }
      cursor='pointer'
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
        >
          { content }
        </Text>
      </Box>
      {
        images.length > 0 && (
          <Grid
            overflow='hidden'
            border='1px solid #ccc'
            rounded='xl'
            gap='.25rem'
            gridTemplateColumns={ images.length === 1 ? '1fr' : '1fr 1fr' }
            gridTemplateRows={{
              base: images.length > 2 ? '150px 150px' : '1fr',
              md: images.length > 2 ? '200px 200px' : '1fr',
              lg: images.length > 2 ? '300px 300px' : '1fr'
            }}
          >
            {
              images.map((image, i) => {
                return (
                  <AspectRatio
                    // original ratio when length is 1, 1/1 when length !== 1
                    ratio={images.length === 1 ? undefined : 1 }
                    key={image.id}
                    gridColumnStart={ (images.length === 3 && i === 2) ? 'span 2' : '' }
                    onClick={ (e) => { e.stopPropagation(); onOpenImage(image.url) } }
                    
                  >
                    <Box
                      cursor='pointer'
                      backgroundImage={`url('${image.url}')`}
                      backgroundRepeat='no-repeat'
                      backgroundPosition='center'
                      backgroundSize='cover'
                    />
                  </AspectRatio>
                )
              })
            }
          </Grid>
        )
      }
      <Box gridColumnStart='span 2'>
        <PostActions
          postId={post.id}
          comments={comments}
          likes={likes}
          reposts={reposts.length}
          onLikeCompleted={ onLikeCompleted }
        />
      </Box>
    </Grid>
  )
}
