import { Link, useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { Box, Button, FormControl, Text, FormLabel, Grid, Heading, Flex } from '@chakra-ui/react'

import { FormInput } from '@twitt-duck/ui'
import { AuthLayout } from '../layouts'

export const RegisterPage = () => {

  const navigate = useNavigate()

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

      <FormControl as='form'>
        <Grid
          gap='1rem'
          mb={8}
        >
          <Box>
            <FormLabel
              color='gray.600'
            >Nombre completo</FormLabel>
            <FormInput placehorder='Introduce tu nombre completo' />
          </Box>

          <Box>
            <FormLabel
              color='gray.600'
            >Nombre de usuario</FormLabel>
            <FormInput placehorder='Introduce tu nombre de usuario' />
          </Box>

          <Box>
            <FormLabel
              color='gray.600'
            >Correo electrónico</FormLabel>
            <FormInput placehorder='Introduce tu correo electrónico' />
          </Box>

          <Box>
            <FormLabel
              color='gray.600'
            >Contraseña</FormLabel>
            <FormInput placehorder='Introduce tu contraseña' />
          </Box>
        </Grid>

        <Button
          w='full'
          color='white'
          bgGradient='linear(to-r, cyan.400, green.200)'
          _hover={{
            border: '1px solid hsla(210,90%,50%,.5)',
            transform: 'scale(1.02)',
          }}
        >Crear cuenta
        </Button>

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

