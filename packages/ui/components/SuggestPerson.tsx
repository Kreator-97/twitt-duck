import { Box, Text } from '@chakra-ui/react'
import { Follow } from './Follow'

export const SuggestPersons = () => {
  return (
    <Box
      bg='white'
      minHeight={'40vh'}
      p='4'
    >
      <Text
        as='h2'
        fontSize='xl'
        fontWeight='bold'
        textAlign='center'
        mb='6'
      >A quien seguir</Text>
      <Box>
        <Follow name='Prince James' />
        <Follow name='Henril Cavill' />
        <Follow name='John Doe' />
        <Follow name='Diego Gomez' />

      </Box>
    </Box>
  )
}
