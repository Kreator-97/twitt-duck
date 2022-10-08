import { Avatar, Box, Flex, Text, Image } from '@chakra-ui/react'
import { PostIcon } from './'

// icons
import { MdShare } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'

export const Post = () => {
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
            name='Tom Holland'
            src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg' />
        </Box>
        <Box>
          <Text
            fontWeight='bold'
          >Tom Holland
            - 
            <Text
              as={'i'}
              fontSize='base'
              fontWeight='light'
              color='gray.500'
            > @tomholland </Text>
          </Text>
          <Text
            fontWeight='light'
            fontSize='sm'
          >
            6 de oct 02:19
          </Text>
        </Box>
      </Flex>
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
            count={10}
          />
          <PostIcon
            icon={AiOutlineRetweet}
            title='Debatir'
            count={4}
          />
          <PostIcon
            icon={HiOutlineHeart}
            title='Me gusta'
            count={217}
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