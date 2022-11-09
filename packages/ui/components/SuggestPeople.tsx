import { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useSuggestedPeople } from '@twitt-duck/hooks'

import { Follow } from '.'

export const SuggestPeople: FC = () => {
  const { users: suggestedUsers } = useSuggestedPeople()

  return (
    <Box
      display={ suggestedUsers.length === 0 ? 'none' : 'block' }
    >
      <Box
        py='2'
        bg='white'
        boxShadow='md'
        borderBottom='1px solid'
        borderColor='gray.300'
      >
        <Text
          as='h2'
          fontSize='lg'
          fontWeight='bold'
          textAlign='center'
          mb='2'
          color='#333'
        >A quien seguir</Text>
      </Box>
      <Box>
        {
          suggestedUsers.map(({id, fullname, profilePic, username, description}) => (
            <Box
              key={ id }
              borderBottom='1px solid'
              borderColor='gray.200'
            >
              <Follow
                name={ fullname }
                imgURL={ profilePic }
                username={ username }
                description={ description }
              />
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}
