import { ChangeEvent, FormEvent, useState } from 'react'
import { login, useAppDispatch, useAppSelector } from '@twitt-duck/state'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react'

import { changePasswordRequest, updateUserRequest } from '../services/user'
import { DBLocal } from '../utils'
import { notEmptyString } from '../utils/validations'
import { ProfileLayout } from '../layouts'
import { useForm } from '../hooks'

const validations = {
  newPassword: {
    message: 'La contraseña debe de tener mínimo 8 caracteres',
    validation: (value:string) => value.length >= 8,
  },
  currentPassword: notEmptyString,
}

export const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAppSelector( state => state.auth )
  const [showPassword, setShowPassword] = useState(false)
  
  if( !user ) {
    navigate('/')
    return <></>
  }

  const changePasswordVisibility = () => setShowPassword(!showPassword)

  const { username, fullname, description, newPassword, currentPassword, onInputChange, errors } = useForm({
    username: user.username,
    fullname: user.fullname,
    description: user.description || '',
    newPassword: '',
    currentPassword: ''
  }, validations)

  const onSaveProfile = async (e: FormEvent ) => {
    e.preventDefault()
    
    const required = [username, fullname, description]

    if( required.some( (value) => !value || value.trim() === '') ) {
      return
    }

    const token = DBLocal.getTokenFromLocal()

    if( !token ) {
      console.warn('token not found')
      return
    }

    try {
      const { user, msg } = await updateUserRequest({ username, fullname, description }, token || '' )
      
      toast({
        title: msg,
        isClosable: true,
        position: 'top',
        duration: 3000,
        status: 'success',
      })

      if( user ) {
        DBLocal.saveUserAndTokenInLocal(user, token)
        dispatch( login(user) )
      }
    } catch (error) {
      if( typeof error === 'string' ) {
        toast({
          title: error,
          isClosable: true,
          position: 'top',
          duration: 3000,
          status: 'warning',
        })
      } else console.error(error)
    }
  }

  const onSavePassword = async (e: FormEvent) => {
    e.preventDefault()

    if( errors.newPassword || errors.currentPassword ) {
      toast({
        title: errors.newPassword,
        isClosable: true,
        position: 'top',
        duration: 3000,
        status: 'warning',
      })
      return
    }
    
    const token = DBLocal.getTokenFromLocal()

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

  const transformUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(' ', '')

    const newEvent = {...e}
    e.target.value = value

    onInputChange(newEvent)
  }

  return (
    <ProfileLayout>
      <Tabs
        colorScheme='cyan'
        mb='4'
      >
        <TabList>
          <Tab>
            Actualiza tu perfil
          </Tab>
          <Tab
          >
            Contraseña
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormControl
              as='form'
              maxWidth='480px'
              m='0 auto'
              onSubmit={ onSaveProfile }
            >
              <Grid
                gridTemplateColumns='1fr'
                gap='1rem'
                mb='2rem'
              >
                <Box>
                  <FormLabel>
                    Nombre completo
                  </FormLabel>
                  <Input
                    name='fullname'
                    onChange={ onInputChange }
                    value={fullname}
                  />
                </Box>

                <Box>
                  <FormLabel>
                    Nombre de usuario
                  </FormLabel>
                  <Input
                    name='username'
                    onChange={ (e) => transformUsername(e) }
                    value={username}
                  />
                </Box>

                <Box>
                  <FormLabel>
                    Descripción
                  </FormLabel>
                  <Input
                    name='description'
                    onChange={ onInputChange }
                    value={description}
                  />
                </Box>
              </Grid>

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
                Guardar cambios
              </Button>
            </FormControl>
          </TabPanel>
          <TabPanel>
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
                      onChange={ onInputChange }
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
                      onChange={ onInputChange}
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
          </TabPanel>
        </TabPanels>
      </Tabs>

    </ProfileLayout>
  )
}
