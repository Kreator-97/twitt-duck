import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react'

export const UserDetail = () => {
  return (
    <Grid
      templateColumns='100px 1fr auto'
      maxW={'800'}
      m='0 auto'
      bg='white'
      p='1rem'
      boxShadow='md'
      mt='-50px'
      rounded='md'
      gap={'1rem'}
    >
      <Image
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg"
        rounded='md'
      >
      </Image>
      <Box>
        <Flex
          gap='1rem'
          height='1.5rem'
          align='baseline'
          mb='4'>
          <Text as='h1' fontWeight={'bold'} fontSize='lg'>Tom Holland</Text>
            -
          <Text as='p' fontWeight={'normal'} fontSize='medium'>
            <span style={{fontWeight: 'bold'}}>5493 </span> Seguidores
          </Text>
            -
          <Text as='p' fontWeight={'normal'} fontSize='medium'>
            <span style={{fontWeight: 'bold'}}>123 </span> Siguiendo
          </Text>
        </Flex>
        <Text as='p' fontWeight='light' color='gray.600'>Actor, filósofo, egocentrico, millonario</Text>
      </Box>

      <Box>
        <Button bg='cyan.500' color='white'>Seguir</Button>
      </Box>
    </Grid>
  )
}
