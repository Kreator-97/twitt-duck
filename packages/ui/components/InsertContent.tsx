import { FC, useRef } from 'react'
import { Box, Button, Flex, Grid } from '@chakra-ui/react'
import { User } from '@twitt-duck/state'
import { UserAvatar } from '.'

interface Props {
  user: User;
  onSubmit?: (content: string) => void;
}

export const InsertContent: FC<Props> = ({onSubmit, user}) => {
  const placeholder = 'Escribe un comentario'
  const contentElementRef = useRef<HTMLDivElement>(null)

  const removePlaceholder = () => {
    const { current } = contentElementRef

    if( current ) {
      if( current.innerText === placeholder) {
        current.innerText = ''
      }
    } 
  }

  const setPlaceholder = () => {
    const { current } = contentElementRef

    if( current ) {
      if( current.innerText.replaceAll('\n', '') === '') {
        current.innerText = placeholder
      }
    }
  }

  const onSubmitEvent = () => {
    const content = contentElementRef.current?.innerText

    if( !content || content?.trim() === '' ) return
    if( content === placeholder ) return

    onSubmit && onSubmit(content)

    contentElementRef.current.innerText = placeholder
  }

  return (
    <Grid
      gridTemplateColumns='48px 1fr'
      columnGap='.5rem'
      rowGap='1rem'
      p='1rem .5rem'
      bgColor='white'
      boxShadow={'md'}
    >
      <UserAvatar name={user.fullname} imgURL={ user.profilePic } />
      <Box
        contentEditable
        _focus={{ outline: 'none', borderBottom: '1px solid #CCC'}}
        ref={ contentElementRef }
        suppressContentEditableWarning
        onFocus={ () => removePlaceholder() }
        onBlur={ () => setPlaceholder() }
        minHeight='3rem'
        borderBottom='1px solid #CCC'
      >
        { placeholder }
      </Box>
      <Flex
        justify='end'
        gridColumnStart='span 2'
      >
        <Button
          size={'sm'}
          color='#fff'
          bgGradient='linear(to-r, blue.400, cyan.400)'
          _hover={{ bgGradient: 'linear(to-r, blue.500, cyan.500)' }}
          onClick={ () => onSubmitEvent() }
        >
          Agregar comentario
        </Button>
      </Flex>
    </Grid>
  )
}
