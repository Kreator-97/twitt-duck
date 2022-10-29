import { Box } from '@chakra-ui/react'
import { useAppSelector } from '@twitt-duck/state'
import { UserInfo } from '@twitt-duck/ui'

import { ProfileLayout } from '../layouts'

export const ProfilePage = () => {
  const { user } = useAppSelector( state => state.auth )

  if( !user ) {
    return <></>
  }

  return (
    <ProfileLayout>
      <Box
        p={0}
        zIndex={100}
        bg='white'
        position='sticky'
        top='0'
      >
        <UserInfo username={ user.username }/>
      </Box>
    </ProfileLayout>
  )
}
