import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, FormControl, Text, FormLabel, Grid, Heading, Flex, useToast } from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'
import { FormInput } from '@twitt-duck/ui'
import { useAppDispatch, login } from '@twitt-duck/state'

import { useForm } from '../hooks/useForm'
import { AuthLayout } from '../layouts'
import { loginRequest } from '../services/auth'

const validations = {
  email: {
    validation: (value: string) => value.trim() !== '',
    message: 'Este campo es requerido'
  },
  password: {
    validation: (value: string) => value.trim() !== '',
    message: 'Este campo es requerido'
  },
}

export const LoginPage = () => {
  const [ showErrors, setShowErrors] = useState(false)
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
      const {user, token} = await loginRequest(email, password)
      
      toast({
        title: 'Inicio de sesión.',
        description: 'Has iniciado sessión exitosamente',
        status: 'success',
        duration: 5000,
        position: 'top',
        isClosable: true,
      })

      // TODO: guardar token actualizar, auth state
      console.log({user, token})
      dispatch( login() )
      onResetForm()
      navigate('/')
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
            { (errors.password && showErrors) && <Text color='red.400' fontSize='sm' mt='.5rem'>{errors.password}</Text> }
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
          Crear cuenta
        </Button>

        <Box mt='4'>
          <Text
            textAlign='center'
            color='gray.600'
          >¿No tienes cuenta?,
            <Link to='/auth/register'>
              <Text as='span' color='cyan.400'> Crea una cuenta</Text>
            </Link>
          </Text>
        </Box>
      </FormControl>
    </AuthLayout >
  )
}
