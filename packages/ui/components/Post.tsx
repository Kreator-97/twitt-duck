import { Avatar, Box, Flex, Text, Image } from '@chakra-ui/react'
import { PostIcon } from './'

// icons
import { FC } from 'react'
import { MdShare } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { Post as PostType} from '@twitt-duck/state'
import { useNavigate } from 'react-router-dom'

interface Props {
  post: PostType;
}

export const Post: FC<Props> = ({post}) => {
  const navigate = useNavigate()
  
  const { author, content, likes, comments, reposts, createdAt } = post
  return (
    <Box
      bg='white'
      p={{base: '2', lg: '4'}}
      mb={{base: '4' }}
      boxShadow='base'
    >
      <Flex
        alignItems='center'
        gap={{ base: '.5rem', lg: '1rem' }}
        mb={{ base: 2, lg: 4 }}
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
      </Flex>
      <Box paddingBottom='1rem'>
        <Text
          fontWeight='normal'
          fontSize='md'
          whiteSpace='pre-wrap'
        >
          { content }
        </Text>
      </Box>
      <Box
        mb={{ base: 2, lg: 4 }}
      >
        <Image
          src='https://plus.unsplash.com/premium_photo-1663021824165-4256f8381934?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
        />
      </Box>
      <Box>
        <Flex
          gap='1rem'
          justify='space-around'
        >
          <PostIcon
            icon={BiCommentDetail}
            title='Comentar'
            count={comments}
          />
          <PostIcon
            icon={AiOutlineRetweet}
            title='Debatir'
            count={reposts}
          />
          <PostIcon
            icon={HiOutlineHeart}
            title='Me gusta'
            count={likes}
          />
          <PostIcon
            icon={MdShare}
            title='Compatir'
          />
        </Flex>
      </Box>
    </Box>
  )
}
