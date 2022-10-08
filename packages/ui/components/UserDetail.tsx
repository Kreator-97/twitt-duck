import { Box, Button, Grid, Image, Text } from '@chakra-ui/react'

export const UserDetail = () => {
  return (
    <Grid
      templateColumns={{ base: '48px 1fr', md: '64px 1fr 48px 48px'}}
      maxW='1280'
      m='0 auto 1rem'
      bg='white'
      p={{ base: '.5rem', md: '1rem'}}
      boxShadow='md'
      mt='-50px'
      rounded='md'
      gap={'.5rem'}
    >
      <Image
        width={{
          base: '32px',
          mg: '48px',
        }}
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg"
        rounded='md'
      />
      <Box>
        <Grid
          gap='.25rem'
          minHeight='1.5rem'
          alignItems='baseline'
        >
          <Text
            as='h1'
            fontWeight={'bold'}
            fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          >Tom Holland - <Text as='span' fontWeight='light' color='gray.500'>@tomholland</Text></Text>
          <Text
            as='p'
            fontWeight={'normal'}
            fontSize={{ base: 'sm' }}
          >
            <Text
              as='span'
              style={{ fontWeight: 'bold' }}
            > 5493 
            </Text> Seguidores -
            <Text
              as='span'
              style={{ fontWeight: 'bold' }}
            > 102
            </Text> Siguiendo
          </Text>
        </Grid>
        <Text
          as='p'
          fontWeight='light'
          color='gray.600'
          fontSize={{ base: 'sm' }}
        >Actor, filósofo, egocentrico, millonario</Text>
      </Box>

      <Box
        width='100%'
        display='block'
        gridColumnStart='span 2'
      >
        <Button
          bg='cyan.500'
          color='white'
          size='sm'
          width='100%'
          display='block'
        >Seguir</Button>
      </Box>
    </Grid>
  )
}
