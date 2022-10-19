import { Grid, Spinner } from '@chakra-ui/react'

export const Loader = () => {
  return (
    <Grid
      maxWidth='100vw'
      height='100vh'
      justifyContent='center'
      alignItems='center'
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
