import { FormEvent, useState } from 'react'
import { changePasswordRequest } from '@twitt-duck/services'
import { Box, Button, FormControl, FormLabel, Grid, Input, InputGroup, useToast } from '@chakra-ui/react'

// TODO: si el usuario tiene credenciales de google no puede cambiar su contraseña

export const FormChangePassword = () => {
  const toast = useToast()
  const [ showPassword, setShowPassword ] = useState(false)
  const [ newPassword, setNewPassword] = useState('')
  const [ currentPassword, setCurrentPassword] = useState('')
  
  const changePasswordVisibility = () => setShowPassword(!showPassword)
  
  const onSavePassword = async (e: FormEvent) => {
    e.preventDefault()

    const required = [newPassword, currentPassword]

    if( required.some(value => !value || value.trim() === '' || value.length <=7 ) ) {
      toast({
        title: 'La contraseña tiene que tener 8 o más caracteres',
        isClosable: true,
        position: 'top',
        duration: 3000,
        status: 'warning',
      })
      return
    }

    const token = localStorage.getItem('token')

    try {
      const { msg } = await changePasswordRequest(currentPassword, newPassword, token || '' )
      toast({
        title: msg,
        isClosable: true,
        position: 'top',
        duration: 3000,
        status: 'success',
      })
      
    } catch (error) {
      toast({
        title: typeof error === 'string' ? error : 'No se pudo cambiar la contraseña',
        isClosable: true,
        position: 'top',
        duration: 3000,
        status: 'warning',
      })
    }
  }
  return (
    <FormControl
      as='form'
      maxWidth='480px'
      m='0 auto'
      onSubmit={ onSavePassword }
    >
      <Grid
        gridTemplateColumns='1fr'
        gap='1rem'
      >
        <Box>
          <FormLabel>
            Contraseña actual
          </FormLabel>
          <InputGroup>

            <Input
              type={showPassword ? 'text' : 'password'}
              name='currentPassword'
              onChange={ (e) => setCurrentPassword(e.target.value) }
              value={currentPassword}
            />

          </InputGroup>
        </Box>

        <Box>
          <FormLabel>
            Contraseña nueva
          </FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              name='newPassword'
              onChange={ (e) => setNewPassword(e.target.value) }
              value={newPassword}
            />
          </InputGroup>
        </Box>
        <Button onClick={changePasswordVisibility}>
          {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        </Button>

        <Button
          margin='0 auto'
          display='block'
          width='full'
          color='white'
          bgGradient='linear(to-r, cyan.400, green.200)'
          _hover={{
            border: '1px solid hsla(210,90%,50%,.5)',
            transform: 'scale(1.02)',
          }}
          type='submit'
        >
          Cambiar contraseña
        </Button>
      </Grid>
    </FormControl>
  )
}
