import { Button, Flex, Grid } from '@chakra-ui/react'
import { Textarea } from './Textarea'

export const NewPost = () => {
  return (
    <Grid
      gridTemplateColumns={{ base: '1fr', sm: '1fr'}}
      gap={{base: 2 }}
      alignItems={'start'}
      margin='0 auto'
      bg="white"
      p={{base: '2', lg: '4'}}
      mb={{base: '2', lg: '4'}}
      borderRadius={2}
      boxShadow="md"
      minW='280px'
    >
      <Textarea />
      <Flex
        justifyContent="end">
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
