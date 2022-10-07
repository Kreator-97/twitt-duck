import { Avatar, Box, Button, Flex, Grid } from '@chakra-ui/react'
import { Textarea } from './Textarea'

export const NewPost = () => {
  return (
    <Grid
      gridTemplateColumns="64px 1fr"
      gap='1rem'
      alignItems={'start'}
      margin='0 auto'
      bg="white"
      p="2"
      borderRadius={2}
      boxShadow="md"
      mb={4}
    >
      <Avatar
        name='Tom Holland'
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg"
        size="48px"
      >
      </Avatar>
      <Textarea />
      <Box></Box>
      <Flex
        justifyContent="end"
        borderTop={'1px solid #ddd'}
        padding='.5rem'>
        <Button
          size='sm'
          bg='cyan.500'
          color='gray.100'
          _hover={{ bg: 'cyan.700'}}
        >Publicar</Button>
      </Flex>
    </Grid>
  )
}
