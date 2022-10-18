import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, useAppDispatch } from '@twitt-duck/state'

import { AuthLayout } from '../layouts'
import { DBLocal } from '../utils'
import { saveProfile } from '../services/auth'
import userDefault from '../assets/images/default-user.png'
import { updateProfileImageRequest } from '../services/upload'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'

export const CustomizePage = () => {
  const [ username, setUsername] = useState('')
  const [ description, setDescription] = useState('')
  const [ tempImg, setTempImg] = useState<string | null>(null)
  const imgFileRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()

    if( !user ) navigate('/auth/login')
  }, [])

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const username = value.replaceAll(' ', '')
    setUsername(username)
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if( e.target.value.length >= 100 ) return
    setDescription(e.target.value)
  }

  const selectImgProfile = () => {
    imgFileRef.current?.click()
  }

  const onImgChange = async () => {
    const files = imgFileRef.current?.files
    if( !files ) return

    const token = localStorage.getItem('token')

    try {
      const imgURL = await updateProfileImageRequest(files, token || '' )
      setTempImg(imgURL)
      
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'No se pudo subir la imagen',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    }
  }

  const onSaveProfile = async (e: FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if( username.trim() === '' ) {
      return toast({
        title: 'Validación',
        description: 'El nombre de usuario es obligatorio',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    }

    try {
      const { msg, token: newToken, user } = await saveProfile({username, description}, token || '')
      
      DBLocal.saveUserAndTokenInLocal(user, newToken)

      toast({
        title: 'Cuenta creada.',
        description: msg,
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })

      navigate('/')
      dispatch( login(user) )
    } catch (error: any) { // eslint-disable-line
      console.error(error)
      toast({
        title: 'No se pudo crear la cuenta',
        description: error,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    }
  }
  
  return (
    <AuthLayout>
      <Heading as='h2'
        fontSize='xl'
        textAlign='center'
        color='#333'
      >
        Ya casi hemos terminado
      </Heading>

      <Flex
        gap='1rem'
        direction='column'
        gridTemplateColumns='1'
        justifyContent='center'
        alignItems='center'
        p='4'
        mt='4'
      >
        <Heading as='h3'
          fontSize='md'
          textAlign='center'
          color='#333'
        >
          Selecciona una imagen de perfil
        </Heading>
        <Box width='64px' height='64px'>
          <Image
            rounded='full'
            cursor='pointer'
            width='64px'
            height='64px'
            src={ tempImg ||userDefault }
            onClick={ () => selectImgProfile() }
          />
          <input
            onChange={ () => onImgChange() }
            type='file'
            style={{ display: 'none' }}
            ref={imgFileRef}
            accept='.gif,.jpg,.jpeg,.png'
          />
        </Box>
        <Heading as='h4'
          fontSize='lg'
          color='#333'
          fontWeight={400}
        >
          @{ username }
        </Heading>
      </Flex>

      <FormControl as='form' onSubmit={onSaveProfile} >
        <Flex direction='column' gap={'1rem'} >
          <Box>
            <FormLabel textAlign='center' fontSize='lg'>
              Elige tu nombre de usuario único
            </FormLabel>
            <Input
              value={ username }
              onChange={ onChangeUsername }
              placeholder='Introduce tu nombre de usuario'
              _placeholder={{color: '#333'}}
              textAlign='center'
            />
          </Box>

          <Box>
            <FormLabel textAlign='center' fontSize='lg'>Cuéntanos algo sobre ti</FormLabel>
            <Textarea
              rows={6}
              onChange={ onDescriptionChange }
              value={ description }
              style={{ resize: 'none' }}
            />
            <Text fontSize='sm' color='gray.600'>Máximo 100 caracteres</Text>
          </Box>
        </Flex>

        <Button
          type='submit'
          colorScheme='cyan'
          width='full'
          color='white'
          mt='4'
        >
          Listo!
        </Button>
      </FormControl>
    </AuthLayout>
  )
}
