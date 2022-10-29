import { Grid, Spinner } from '@chakra-ui/react'

export const Loader = () => {
  return (
    <Grid
      maxWidth='100vw'
      width='100%'
      height='100vh'
      justifyContent='center'
      alignItems='center'
      position='fixed'
      top='0'
      left='0'
      background={'whiteAlpha.500'}
      backdropFilter='blur(2px)'
      zIndex='modal'
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Grid>
  )
}
