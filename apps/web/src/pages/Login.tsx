import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { FormInput, GoogleButton } from '@twitt-duck/ui'
import { useAppDispatch, login } from '@twitt-duck/state'
import { googleRequest, loginRequest } from '@twitt-duck/services'
import { useForm } from '@twitt-duck/hooks'

import { AuthLayout } from '../layouts'
import { DBLocal } from '../utils'
import { notEmptyString } from '../utils/validations'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react'

const validations = { email: notEmptyString, password: notEmptyString }

export const LoginPage = () => {
  const [ showErrors, setShowErrors ] = useState(false)
  const dispatch = useAppDispatch()
  const toast = useToast()

  const navigate = useNavigate()
  const { email, password, errors, onResetForm, onInputChange } = useForm({
    email: '',
    password: ''
  }, validations)

  const onLogin = async (e: FormEvent) => {
    e.preventDefault()

    if( Object.values(errors).some((value) => value !== null) ) {
      setShowErrors(true)
      return
    }

    try {
      const { user, token } = await loginRequest(email, password)
      
      DBLocal.saveUserAndTokenInLocal(user, token)

      if( !user.active ) {
        navigate('/auth/customize')
        return
      }
      
      toast({
        title: 'Inicio de sesión.',
        description: 'Has iniciado sessión exitosamente',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })

      dispatch( login(user) )
      onResetForm()
      navigate('/')
    } catch (error: any) { // eslint-disable-line
      console.error(error)
      toast({
        title: 'No se pudo iniciar la sesión',
        description: error,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    }
  }

  const onGoogleSignIn = async (googleToken: string) => {
    try {
      const { user, token } = await googleRequest(googleToken)

      if( !user.active ) {
        navigate(`/auth/customize?email=${user.email}`)
        return
      }

      toast({
        title: 'Inicio de sesión.',
        description: 'Has iniciado sessión exitosamente',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
  
      dispatch( login(user) )
      navigate('/')
      DBLocal.saveUserAndTokenInLocal(user, token)

    } catch (error: any) { //eslint-disable-line
      console.log(error)
      toast({
        title: 'No se pudo iniciar la sesión',
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
      <Flex
        justify='space-between'
        alignContent='center'
        mb='6'
      >
        <MdArrowBack
          cursor='pointer'
          size='24px'
          color='#4A5568'
          onClick={() => navigate(-1) }
        />
        <Heading
          as='h1'
          size='md'
          textAlign='center'
          color='gray.600'
        >
          Inicia sesión
        </Heading>
        <Box width='24px' />
      </Flex>

      <FormControl as='form'
        method='POST'
        onSubmit={ onLogin }
      >
        <Grid
          gap='1rem'
          mb={8}
        >
          <Box>
            <FormLabel
              color='gray.600'
            >Correo Electrónico</FormLabel>
            <FormInput
              placehorder='Introduce tu correo electrónico'
              type='email'
              name='email'
              value={ email }
              onChange={ onInputChange }
              required
            />
            {
              ( errors.password && showErrors ) &&
              <Text
                color='red.400'
                fontSize='sm'
                mt='.5rem'>
                { errors.password }
              </Text>
            }
          </Box>

          <Box>
            <FormLabel
              color='gray.600'
            >Contraseña</FormLabel>
            <FormInput
              type='password'
              placehorder='Introduce tu contraseña'
              name='password'
              value={ password }
              onChange={ onInputChange }
              required
            />
          </Box>
        </Grid>

        <Button
          type='submit'
          w='full'
          color='white'
          bgGradient='linear(to-r, cyan.400, green.200)'
          _hover={{
            border: '1px solid hsla(210,90%,50%,.5)',
            transform: 'scale(1.02)',
          }}
        >
          Iniciar sesión
        </Button>

        <Flex
          justify='center'
          align='center'
          direction='column'
          gap='1rem'
          mt={8}
        >
          <Heading
            size='md'
            textAlign='center'
            color='gray.600'
          >
            Inicia sesión con tu cuenta Google
          </Heading>
          <GoogleButton onSignIn={ onGoogleSignIn }/>
        </Flex>

        <Box mt='4'>
          <Text
            textAlign='center'
            color='gray.600'
          >
            ¿No tienes cuenta?,
            <Link to='/auth/register'>
              <Text as='span' color='cyan.400'> Crea una cuenta</Text>
            </Link>
          </Text>
        </Box>
      </FormControl>
    </AuthLayout >
  )
}
