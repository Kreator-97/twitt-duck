import { FC } from 'react'
import { Avatar, Box, Flex, Text, Grid } from '@chakra-ui/react'
import { AspectRatio } from '@chakra-ui/react'
import { Post as PostType} from '@twitt-duck/state'
import { useNavigate } from 'react-router-dom'

// icons
import { MdShare } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'

import { PostIcon } from './'

interface Props {
  post: PostType;
}

export const Post: FC<Props> = ({post}) => {
  const navigate = useNavigate()
  
  const { author, content, likes, comments, reposts, createdAt, images } = post
  return (
    <Grid
      bg='white'
      mb={{ base: '4' }}
      boxShadow='base'
      gridTemplateColumns='48px 1fr'
      p={{ base: '.25rem', lg: '.5rem' }}
      rowGap={{ base: '.25rem', lg: '.5rem' }}
      columnGap={{ base: '.25rem', lg: '.5rem' }}
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
          onClick={ () => navigate(`/user/${author.username}`)}
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
        <Flex
          gap='1rem'
          justify='space-evenly'
          alignItems='center'
        >
          <Box>
            <PostIcon
              icon={BiCommentDetail}
              title='Comentar'
              count={comments}
            />
          </Box>
          <Box>
            <PostIcon
              icon={AiOutlineRetweet}
              title='Debatir'
              count={reposts}
            />
          </Box>
          <Box>
            <PostIcon
              icon={HiOutlineHeart}
              title='Me gusta'
              count={likes}
            />
          </Box>
          <Box>
            <PostIcon
              icon={MdShare}
              title='Compatir'
            />
          </Box>
        </Flex>
      </Box>
    </Grid>
  )
}
