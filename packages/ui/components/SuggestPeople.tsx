import { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useSuggestedPeople } from '@twitt-duck/hooks'

import { Follow } from '.'

export const SuggestPeople: FC = () => {
  const { users: suggestedUsers } = useSuggestedPeople()

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
      >¿A quien seguir?</Text>
      <Box>
        {
          suggestedUsers.map(({id, fullname, profilePic, username, description}) => (
            <Follow
              key={ id }
              name={ fullname }
              imgURL={ profilePic }
              username={ username }
              description={ description }
            />
          ))
        }
      </Box>
    </Box>
  )
}
