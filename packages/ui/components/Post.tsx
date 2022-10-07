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
      p={2}
      mb={4}
      boxShadow='base'
    >
      <Flex alignItems='center' gap='1rem' mb={2}>
        <Box width='64px'>
          <Avatar
            size='64px'
            name='Tom Holland'
            src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg' />
        </Box>
        <Box>
          <Text fontWeight='bold'>Tom Holland</Text>
          <Text
            fontWeight='light'
            fontSize='sm'
          >
            6 de oct 02:19
          </Text>
        </Box>
      </Flex>
      <Box
        mb={2}
      >
        <Image
          src='https://plus.unsplash.com/premium_photo-1663021824165-4256f8381934?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
        />
      </Box>
      <Box>
        <Flex
          gap='1rem'
          padding='.5rem 0'
          justify='space-around'
        >
          <PostIcon
            icon={BiCommentDetail}
            title='Comentar'
            size='1.5rem'
            count={10}
          />
          <PostIcon
            icon={AiOutlineRetweet}
            title='Debatir'
            size='1.5rem'
            count={4}
          />
          <PostIcon
            icon={HiOutlineHeart}
            title='Me gusta'
            size='1.5rem'
            count={217}
          />
          <PostIcon
            icon={MdShare}
            title='Compatir'
            size='1.5rem'
          />
        </Flex>
      </Box>
    </Box>
  )
}