import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { Box, Button, FormControl, Text, FormLabel, Grid, Heading, Flex, useToast } from '@chakra-ui/react'
import { FormInput, GoogleButton } from '@twitt-duck/ui'
import { useAppDispatch, login } from '@twitt-duck/state'

import { AuthLayout } from '../layouts'
import { useForm } from '../hooks/useForm'
import { googleRequest, registerRequest } from '../services/auth'

const validations = {
  fullname: {
    validation: (value: string) => value.trim() !== '',
    message: 'Este campo es requerido'
  },
  username: {
    validation: (value: string) => value.trim() !== '',
    message: 'Este campo es requerido'
  },
  email: {
    validation: (value: string) => value.trim() !== '',
    message: 'Este campo es requerido'
  },
  password: {
    validation: (value: string) => value.length >= 8,
    message: 'La contraseña debe de tener 8 o más caracteres'
  },
}

export const RegisterPage = () => {
  const dispatch = useAppDispatch()
  
  const [ showErrors, setShowErrors ] = useState(false)
  const toast = useToast()

  const { email, fullname, password, username, onInputChange, errors, onResetForm } = useForm({
    fullname: '',
    username: '',
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
      const {user, token} = await registerRequest(fullname, username, email, password)
      
      toast({
        title: 'Cuenta creada.',
        description: 'Bienvenido. Únete a la conversación',
        status: 'success',
        duration: 5000,
        position: 'top',
        isClosable: true,
      })

      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))

      // TODO: guardar token actualizar, auth state
      console.log({user, token})
      dispatch( login(user) )
      onResetForm()
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

  const navigate = useNavigate()

  const onGoogleSignIn = async (googleToken: string) => {

    try {
      const { user, token } = await googleRequest(googleToken)

      toast({
        title: 'Inicio de sesión.',
        description: 'Has iniciado sessión exitosamente',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
  
      // TODO: Enviar datos del usuario al login
      dispatch( login(user) )

      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))

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
            >Elige tu nombre de usuario
            </FormLabel>
            <FormInput
              required
              placehorder='Introduce tu nombre de usuario'
              name='username'
              value={username}
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
            >Contraseña</FormLabel>
            <FormInput
              required
              placehorder='Introduce tu contraseña'
              type='password'
              name='password'
              value={password}
              onChange={ onInputChange }
            />
            { (errors.password && showErrors) && <Text color='red.400' fontSize='sm' mt='.5rem'>{errors.password}</Text> }
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
        >Crear cuenta</Button>

        <Flex justify='center' align='center' mt={8} direction='column' gap='1rem'>
          <Heading size='md' textAlign='center' color='gray.600'>Inicia sesión con tu cuenta Google</Heading>
          <GoogleButton onSignIn={ onGoogleSignIn } />
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
