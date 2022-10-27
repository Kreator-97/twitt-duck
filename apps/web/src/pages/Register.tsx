// The register page is intended to be the page where an user is created
// Howrever, when a new user is created, we need more personal data.
// For that reason, we continue the proccess of customize a user profile in the page '/customize'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { FormInput, GoogleButton } from '@twitt-duck/ui'
import { useAppDispatch, login } from '@twitt-duck/state'
import { googleRequest, registerRequest } from '@twitt-duck/services'
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

const validations = {
  fullname: notEmptyString,
  email: notEmptyString,
  password: {
    validation: (value: string) => value.length >= 8,
    message: 'La contraseña debe de tener 8 o más caracteres'
  },
}

export const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const [ showErrors, setShowErrors ] = useState(false)


  const { email, fullname, password, errors, onInputChange, onResetForm } = useForm({
    fullname: '',
    email   : '',
    password: '',
  }, validations)

  const onRegister = async (e: FormEvent) => {
    e.preventDefault()

    if( Object.values(errors).some((value) => value !== null) ) {
      setShowErrors(true)
      return
    }

    try {
      const { token, user } = await registerRequest(fullname, email, password)
      onResetForm()

      DBLocal.saveUserAndTokenInLocal(user, token)

      // continue at the customize profile page
      navigate(`/auth/customize?email=${email}`)

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

      DBLocal.saveUserAndTokenInLocal(user, token)

      navigate('/')
    } catch (error: any) { //eslint-disable-line
      console.log(error)
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
          Crear cuenta
        </Heading>
        <Box width='24px' />
      </Flex>

      <FormControl as='form'
        method='post'
        onSubmit={ onRegister }
      >
        <Grid
          gap='1rem'
          mb={8}
        >
          <Box>
            <FormLabel
              color='gray.600'
            >
              Introduce tu nombre completo
            </FormLabel>
            <FormInput
              required
              placehorder='Introduce tu nombre completo'
              name='fullname'
              value={fullname}
              onChange={ onInputChange }
            />
          </Box>

          <Box>
            <FormLabel
              color='gray.600'
            >Correo electrónico</FormLabel>
            <FormInput
              required
              placehorder='Introduce tu correo electrónico'
              type='email'
              name='email'
              value={email}
              onChange={ onInputChange }
            />
          </Box>

          <Box>
            <FormLabel
              color='gray.600'
            >
              Contraseña
            </FormLabel>
            <FormInput
              required
              placehorder='Introduce tu contraseña'
              type='password'
              name='password'
              value={password}
              onChange={ onInputChange }
            />
            {
              (errors.password && showErrors) &&
              <Text
                color='red.400'
                fontSize='sm'
                mt='.5rem'
              >
                { errors.password }
              </Text>
            }
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
          Continuar
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
          <GoogleButton
            onSignIn={ onGoogleSignIn }
          />
        </Flex>

        <Box mt='4'>
          <Text
            textAlign='center'
            color='gray.600'
          >¿Ya tienes cuenta?, 
            <Link to='/auth/login' >
              <Text as='span' color='cyan.400'> Inicia sesión </Text>
            </Link>
          </Text>
        </Box>
      </FormControl>
    </AuthLayout >
  )
}
