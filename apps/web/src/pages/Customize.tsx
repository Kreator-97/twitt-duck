import { ChangeEvent, FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login, useAppDispatch } from '@twitt-duck/state'

import { AuthLayout } from '../layouts'
import { DBLocal } from '../utils'
import { saveProfile } from '../services/auth'
import userDefault from '../assets/images/default-user.png'

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
  const [ textarea, setTextarea] = useState('')
  const { search } = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const username = value.replaceAll(' ', '')
    setUsername(username)
  }

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if( e.target.value.length >= 100 ) return
    setTextarea(e.target.value)
  }

  const onSaveProfile = async (e: FormEvent) => {
    e.preventDefault()

    const email = search.split('=')[1]

    try {
      const { msg, token, user } = await saveProfile(username, textarea, '/images/default-user.png', email )
      
      DBLocal.saveUserAndTokenInLocal(user, token)

      toast({
        title: 'Cuenta creada.',
        description: msg,
        status: 'success',
        duration: 5000,
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
        duration: 5000,
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
        <Box
          width='64px'
          height='64px'
        >
          <Image
            cursor='pointer'
            width='64px'
            height='64px'
            src={userDefault}
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

      <FormControl as='form'
        onSubmit={onSaveProfile}
      >
        <Flex
          direction='column'
          gap={'1rem'}
        >
          <Box>
            <FormLabel
              textAlign='center'
              fontSize='lg'>
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
            <FormLabel
              textAlign='center'
              fontSize='lg'
            >
              Cuentanos algo sobre ti
            </FormLabel>
            <Textarea
              rows={6}
              onChange={ onTextareaChange }
              value={ textarea }
              style={{ resize: 'none' }}
            />
            <Text
              fontSize='sm'
              color='gray.600'
            >
              Máximo 100 caracteres
            </Text>
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
