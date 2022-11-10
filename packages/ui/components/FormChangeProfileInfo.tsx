import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react'
import { mutateUser, updateProfileImageRequest, updateUserRequest } from '@twitt-duck/services'
import { login, useAppDispatch, User } from '@twitt-duck/state'

import { Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  useToast,
  Text
} from '@chakra-ui/react'

interface Props {
  user: User;
  setIsLoading: (value: boolean) => void
  onComplete?: (user: User, token: string) => void
}

export const FormChangeProfileInfo: FC<Props> = ({user, setIsLoading, onComplete}) => {
  const profilePicInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const [ username, setUsername] = useState(user.username)
  const [ fullname, setFullname] = useState(user.fullname)
  const [ description, setDescription] = useState(user.description || '')
  const dispatch = useAppDispatch()

  const onSaveProfile = async (e: FormEvent ) => {
    e.preventDefault()
    const required = [username, fullname]

    if( required.some( (value) => !value || value.trim() === '') ) {
      toast({
        isClosable: true,
        duration: 3000,
        position: 'top',
        status: 'warning',
        title: 'Validación',
        description: 'Los campos nombre completo y nombre de usuario no pueden estar vacios'
      })
      return
    }

    const token = localStorage.getItem('token')

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
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        dispatch( login(user) )
        mutateUser(user.username)
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

  const onChangeProfilePicture = async () => {
    setIsLoading(true)
    const files = profilePicInputRef.current?.files
    if( !files ) return
    
    const token = localStorage.getItem('token')
    if( !token ) return console.error('token no existe')

    try {
      const imgURL = await updateProfileImageRequest(files, token || '')

      if( !imgURL ) {
        return Promise.reject('hubo un error al subir la imagen')
      }

      const newUser: User = { ...user, profilePic: imgURL}
      setIsLoading(false)

      dispatch(login({...user, profilePic: imgURL }))

      onComplete && onComplete(newUser, token)

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

  const transformUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value.replaceAll(' ', '')
    setUsername(username)
  }

  return (
    <FormControl
      as='form'
      maxWidth='480px'
      m='0 auto'
      onSubmit={ onSaveProfile }
      data-test-id="form-profile-info"
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
            onChange={ (e) => setFullname(e.target.value) }
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
            onChange={ (e) => setDescription(e.target.value) }
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
  )
}
