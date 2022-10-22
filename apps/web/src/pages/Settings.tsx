import { useState } from 'react'
import { useAppSelector, User } from '@twitt-duck/state'
import { ChangeBackgroundPicture, FormChangePassword, FormChangeProfileInfo, Loader } from '@twitt-duck/ui'
import { useNavigate } from 'react-router-dom'
import { mutate } from 'swr'

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'

import { DBLocal } from '../utils'
import { ProfileLayout } from '../layouts'

export const SettingsPage = () => {
  const navigate = useNavigate()

  const { user } = useAppSelector( state => state.auth )
  const [ isLoading, setIsLoading] = useState(false)

  if( !user ) {
    navigate('/')
    return <></>
  }

  const onProfileUpdate = (user: User, token: string) => {
    mutate(`http://localhost:5000/api/user/${user.username}`)
    DBLocal.saveUserAndTokenInLocal(user, token)
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
            <FormChangeProfileInfo user={user} setIsLoading={setIsLoading} onComplete={ onProfileUpdate } />
          </TabPanel>
          <TabPanel>
            <FormChangePassword />
          </TabPanel>
          <TabPanel>
            <ChangeBackgroundPicture setIsLoading={setIsLoading} user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {
        isLoading && <Loader />
      }
    </ProfileLayout>
  )
}
