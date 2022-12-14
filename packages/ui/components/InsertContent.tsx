import { FC, useRef } from 'react'
import { Box, Button, Flex, Grid } from '@chakra-ui/react'
import { User } from '@twitt-duck/state'

import { UserAvatar } from '.'
import { pasteOnlyText } from '../utils'

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
  
  const onPaste = () => {
    const contentDiv = contentElementRef.current
    if( !contentDiv ) return
    pasteOnlyText( contentDiv )
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
        ref={ contentElementRef }
        suppressContentEditableWarning
        minHeight='3rem'
        borderBottom='1px solid #CCC'
        onFocus={ () => removePlaceholder() }
        onBlur={ () => setPlaceholder() }
        onPaste={ onPaste }
        _focus={{ outline: 'none', borderBottom: '1px solid #CCC'}}
        data-test-id='create-subcomment'
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
