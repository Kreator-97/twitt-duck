import { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { User } from '@twitt-duck/state'

import { Follow } from './Follow'

interface Props {
  suggestedUsers : User[] 
}

export const SuggestPeople: FC<Props> = ({suggestedUsers}) => {

  return (
    <Box
      bg='white'
      p='4'
      boxShadow='md'
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
          suggestedUsers.map(({id, fullname, profilePic, username}) => (
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
