import { Box } from '@chakra-ui/react'
import { HiOutlinePlus } from 'react-icons/hi'

export const FloatingActionButton = () => {
  return (
    <Box
      zIndex='200'
      boxShadow='md'
      position='fixed'
      right={{base: '1rem', sm: '2rem', md: '3rem', lg: '90%' }}
      bottom={{base: '4rem', lg: '2rem' }}
      bg='cyan.500'
      padding='.5rem'
      rounded='full'
      cursor='pointer'
      transform='scale(1)'
      transition='all .3s ease-out'
      _hover={{
        transform: 'scale(1.1) rotate(-90deg)',
        bg: 'cyan.600'
      }}
    >
      <HiOutlinePlus size={'32px'} color='white'/>
    </Box>
  )
}