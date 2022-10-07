import { Box, Text } from '@chakra-ui/react'

export const Tendencies = () => {
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
      >Tendencias</Text>
      <Box>
        <Box mb='4'>
          <Text fontWeight='bold' fontSize='xl'>#playstation</Text>
          <Text fontWeight='light' fontSize='md'>2001 publicaciones</Text>
        </Box>
        <Box mb='4'>
          <Text fontWeight='bold' fontSize='xl'>#shazam</Text>
          <Text fontWeight='light' fontSize='md'>2001 publicaciones</Text>
        </Box>
        <Box mb='4'>
          <Text fontWeight='bold' fontSize='xl'>#henrilcavil</Text>
          <Text fontWeight='light' fontSize='md'>2001 publicaciones</Text>
        </Box>
        <Box mb='4'>
          <Text fontWeight='bold' fontSize='xl'>#100DaysOfCode</Text>
          <Text fontWeight='light' fontSize='md'>2001 publicaciones</Text>
        </Box>

      </Box>
    </Box>
  )
}
