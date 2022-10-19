import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Button, Flex, FormControl, Grid } from '@chakra-ui/react'
import { Textarea } from './Textarea'

interface Props {
  onCreatePost?(content:string): void
}

// TODO: agregar opcion de elegir la privacidad del post al momento de creación 

export const NewPost: FC<Props> = ({onCreatePost}) => {
  const [ content, setContent ] = useState('')
  
  const onContentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const onSubmitPost = async (e:FormEvent) => {
    e.preventDefault()

    if( content.trim() === '' ) return
    if( onCreatePost ) {
      onCreatePost(content)
      setContent('')
    }
  }

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
      <Textarea
        value={content}
        onChange={ onContentChange }
      />
      <FormControl as='form'
        onSubmit={ onSubmitPost }
      >
        <Flex
          justifyContent="end">
          <Button
            type='submit'
            size='sm'
            bg='cyan.500'
            color='gray.100'
            _hover={{ bg: 'cyan.700'}}
          >
            Publicar
          </Button>
        </Flex>
      </FormControl>
    </Grid>
  )
}
