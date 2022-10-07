import { Box, Text } from '@chakra-ui/react'

export const Tendencies = () => {
  return (
    <Box
      bg='white'
      minHeight={'40vh'}
      p='4'
      boxShadow='md'
    >
      <Text
        as='h2'
        fontSize='xl'
        fontWeight='bold'
        textAlign='center'
        mb='2'
      >Tendencias</Text>
      <Box>
        <Box mb='2'>
          <Text fontWeight='bold' fontSize='lg'>#playstation</Text>
          <Text fontWeight='light' fontSize='md'>2001 publicaciones</Text>
        </Box>
        <Box mb='2'>
          <Text fontWeight='bold' fontSize='lg'>#shazam</Text>
          <Text fontWeight='light' fontSize='md'>2001 publicaciones</Text>
        </Box>
        <Box mb='2'>
          <Text fontWeight='bold' fontSize='lg'>#henrilcavil</Text>
          <Text fontWeight='light' fontSize='md'>2001 publicaciones</Text>
        </Box>
        <Box mb='2'>
          <Text fontWeight='bold' fontSize='lg'>#100DaysOfCode</Text>
          <Text fontWeight='light' fontSize='md'>2001 publicaciones</Text>
        </Box>
      </Box>
    </Box>
  )
}
