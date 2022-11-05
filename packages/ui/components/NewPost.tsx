import { FC, FormEvent, useRef, useState } from 'react'
import { MdOutlineImage } from 'react-icons/md'
import { createPost, mutateAllPages, uploadMultipleImagesRequest } from '@twitt-duck/services'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Icon,
  Select,
  Text,
  useToast
} from '@chakra-ui/react'

import { Loader } from '.'
import { useLocation } from 'react-router-dom'

export const NewPost: FC = () => {
  const toast = useToast()
  const { pathname } = useLocation()
  const contentElementRef = useRef<HTMLDivElement>(null)
  const inputImagesRef = useRef<HTMLInputElement>(null)
  const [ privacy, setPrivacy] = useState<string>('ALL')
  const [ filesSelectedLength, setFilesSelectedLength ] = useState<number>(0)
  const [ createPostLoading, setCreatePostLoading] = useState(false)
  const placeholder = '¿Que está pasando?'

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

  const onSubmitPost = async (e:FormEvent) => {
    e.preventDefault()

    const fileList = inputImagesRef.current?.files
    const content = contentElementRef.current?.innerText

    if( !content || content.trim() === '') return
    if( content === placeholder ) return

    if( Number(fileList?.length) > 4 ) {
      toast({
        title: 'Advertencia',
        description: 'Solamente se pueden subir un máximo de 4 imagenes por publicación',
        status: 'warning',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      return
    }

    if( onCreatePost ) {
      onCreatePost(content, privacy, fileList || undefined)
      contentElementRef.current.innerText = placeholder
      if( inputImagesRef.current) {
        inputImagesRef.current.value = ''
        setFilesSelectedLength(0)
      }
    }
  }

  const onCreatePost = async (content: string, privacy: string, fileList?: FileList) => {
    setCreatePostLoading(true)
    const token = localStorage.getItem('token') 

    let images: string[] = []

    if( fileList ) {
      images = await uploadMultipleImagesRequest( fileList, token || '' )
    }

    try {
      await createPost(content, images, token || '', privacy)
      toast({
        title: 'Publicación creada',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })

      mutateAllPages(pathname)

      setCreatePostLoading(false)
    } catch (error) {
      setCreatePostLoading(false)
      console.log(error)
      if( typeof error === 'string' ) {
        toast({
          title: 'No se pudo crear el post',
          description: error,
          status: 'error',
          duration: 3000,
          position: 'top',
          isClosable: true,
        })
      }
    }
  }

  const onSelectImages = () => {
    inputImagesRef.current?.click()
  }

  const onInputFileChange = () => {
    const filesLength = inputImagesRef.current?.files?.length
    setFilesSelectedLength(filesLength|| 0)
  }

  return (
    <Grid
      gridTemplateColumns={{ base: '1fr', sm: '1fr'}}
      gap={{base: 2 }}
      alignItems={'start'}
      margin='0 auto'
      bg="white"
      p={{base: '2', lg: '4'}}
      borderRadius={2}
      boxShadow="md"
      minW='280px'
      width='100%'
    >
      <Box
        contentEditable
        _focus={{ outline: 'none', border: 'none' }}
        ref={ contentElementRef }
        suppressContentEditableWarning
        onFocus={ () => removePlaceholder() }
        onBlur={ () => setPlaceholder() }
        minHeight='3rem'
      >
        ¿Que está pasando?
      </Box>
      <FormControl as='form'
        onSubmit={ onSubmitPost }
        borderTop='1px solid #eee'
        padding={{base: '.5rem 0 0', lg: '1rem 0 0' }}
      >
        <Grid
          gridTemplateColumns='1fr auto'
          alignItems='center'
          gap='.25rem'
        >
          <Flex
            gap={{base: '.5rem', md: '1rem'}}
            alignItems='center'
          >
            <Select
              maxWidth='120px'
              width='100%'
              size='sm'
              value={privacy}
              onChange={ (e) => setPrivacy(e.target.value) }
              rounded='md'
              border='1px solid #eee'
            >
              <option value='ALL'>Todos</option>
              <option value='ONLY_FOLLOWERS'>Seguidores</option>
            </Select>
            <Icon
              as={MdOutlineImage}
              cursor='pointer'
              boxSize='24px'
              color='#444'
              _hover={{ fill: 'red.300'}}
              title='Agregar imagen'
              onClick={ () => onSelectImages() }
            />
            {
              ( filesSelectedLength > 0) &&
              <Box>
                <Text
                  fontSize={{base: 'xs', md: 'sm'}}
                  display='block'
                  overflow='hidden'
                  height='1.3rem'
                  textOverflow='ellipsis'
                  wordBreak='break-word'
                >
                  {`${filesSelectedLength} ${ filesSelectedLength === 1 ? 'imagen seleccionada' : 'imagenes seleccionadas'}`}
                </Text>
              </Box>
            }
            <input
              type='file'
              accept='.png, .jpg, .jpeg, .webp'
              style={{ display: 'none' }}
              ref={inputImagesRef}
              onChange={ () => onInputFileChange() }
              multiple
            />
          </Flex>
          <Button
            type='submit'
            size='sm'
            color='#fff'
            bgGradient='linear(to-r, blue.400, cyan.400)'
            _hover={{ bgGradient: 'linear(to-r, blue.500, cyan.500)'}}
          >
            Publicar
          </Button>
        </Grid>
      </FormControl>
      {
        createPostLoading && <Loader />
      }
    </Grid>
  )
}
