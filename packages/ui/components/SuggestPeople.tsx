import { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useAppSelector } from '@twitt-duck/state'

import { Follow } from '.'
import { useSuggestedPeople } from '@twitt-duck/hooks'

export const SuggestPeople: FC = () => {
  const { users: suggestedUsers } = useSuggestedPeople()

  const { user } = useAppSelector(state => state.auth)

  return (
    <Box
      bg='white'
      p='4'
      boxShadow='md'
      display={ suggestedUsers.length === 0 ? 'none' : 'block' }
    >
      <Text
        as='h2'
        fontSize='xl'
        fontWeight='bold'
        textAlign='center'
        mb='2'
      >A quien seguir</Text>
      <Box>
        {
          // filter all user by case if some suggested users is the user authenticated
          suggestedUsers.filter((u) => u.username !== user?.username)
            .map(({id, fullname, profilePic, username}) => (
              <Follow
                key={ id }
                name={ fullname }
                imgURL={ profilePic }
                username={ username }
              />
            ))
        }
      </Box>
    </Box>
  )
}
