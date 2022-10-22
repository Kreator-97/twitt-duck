import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { login, useAppDispatch, useAppSelector } from '@twitt-duck/state'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@twitt-duck/ui'
import { mutate } from 'swr'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react'

import { changePasswordRequest, updateUserBackgroundRequest, updateUserRequest } from '../services/user'
import { DBLocal } from '../utils'
import { notEmptyString } from '../utils/validations'
import { ProfileLayout } from '../layouts'
import { updateProfileImageRequest, uploadMultipleImagesRequest } from '../services/upload'
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
  const profilePicInputRef = useRef<HTMLInputElement>(null)
  const backgroundPicInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const { user } = useAppSelector( state => state.auth )
  const [ showPassword, setShowPassword ] = useState(false)
  const [ isLoading, setIsLoading] = useState(false)

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
    currentPassword: '',
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

  const onChangeProfilePicture = async () => {
    setIsLoading(true)
    const files = profilePicInputRef.current?.files
    if( !files ) return
    
    const token = DBLocal.getTokenFromLocal()
    if( !token ) return console.error('token no existe')

    try {
      const imgURL = await updateProfileImageRequest(files, token || '')

      if( !imgURL ) {
        return Promise.reject('hubo un error al subir la imagen')
      }

      setIsLoading(false)

      DBLocal.saveUserAndTokenInLocal({...user, profilePic: imgURL}, token)
      dispatch(login({...user, profilePic: imgURL }))
      mutate(`http://localhost:5000/api/user/${username}`)

      toast({
        title: 'Imagen de perfil actualizada con éxito',
        isClosable: true,
        position: 'top',
        duration: 3000,
        status: 'success',
      })
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      if( typeof error === 'string' ) {
        toast({
          title: error,
          isClosable: true,
          position: 'top',
          duration: 3000,
          status: 'error',
        })
      }
    }
  }

  const onChangeBackgroundPicture = async () => {
    const files = backgroundPicInputRef.current?.files

    if( !files ) return

    const token = DBLocal.getTokenFromLocal()

    try {
      const images = await uploadMultipleImagesRequest(files, token || '')
      const imgURL = await updateUserBackgroundRequest(images[0], token || '')

      dispatch(login({...user, backgroundPic: imgURL }))

      toast({
        title: 'imagen de fondo actualizada',
        status: 'success',
        position: 'top',
        isClosable: true,
        duration: 3000,
      })
    } catch (error) {
      console.log(error)
      if( typeof error === 'string' ) {
        toast({
          title: 'Ocurrió un error al intentar cambiar la imagen',
          status: 'error',
          position: 'top',
          isClosable: true,
          duration: 3000,
        })
      }
    }
  }

  return (
    <ProfileLayout>
      <Tabs
        colorScheme='cyan'
        mb='4'
      >
        <TabList>
          <Tab>Actualiza tu perfil</Tab>
          <Tab>Contraseña</Tab>
          <Tab>Imagen de fondo</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormControl
              as='form'
              maxWidth='480px'
              m='0 auto'
              onSubmit={ onSaveProfile }
            >
              <Flex
                gridTemplateColumns='1fr'
                justifyContent='center'
                alignItems='center'
                my='2rem'
                gap='1rem'
                flexDirection='column'
              >
                <Image
                  src={user.profilePic}
                  width='80px'
                  height='80px'
                  objectFit='cover'
                  rounded='full'
                  cursor='pointer'
                  onClick={ () => profilePicInputRef.current?.click() }
                />
                <Text color='gray.400' fontSize='sm'>Haz click en la imagen para cambiarla</Text>
                <input
                  ref={profilePicInputRef}
                  type='file'
                  accept='.jpg, .jpeg, .png, .webp'
                  style={{display: 'none'}}
                  onChange={ onChangeProfilePicture }
                  multiple={false}
                />
              </Flex>
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
          <TabPanel>
            <Image
              src={ user.backgroundPic ? user.backgroundPic : '/images/default-bg.jpg' }
              cursor='pointer'
              onClick={ () => backgroundPicInputRef.current?.click() }
            />
            <Heading
              fontSize='sm'
              color='gray.500'
              as='h3'
              textAlign='center'
              py='2'
            >Haz click en la imagen para cambiarla</Heading>
            <input
              multiple={false}
              type='file'
              accept='.jpg, .jpeg, .png, .webp'
              ref={backgroundPicInputRef}
              style={{ display: 'none' }}
              onChange={ () => onChangeBackgroundPicture() }
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {
        isLoading && <Loader />
      }
    </ProfileLayout>
  )
}
