import { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface Props {
  title: string;
  to: string;
  active?: boolean;
}

export const ProfileOption: FC<Props> = ({title, to, active = false}) => {
  
  return (
    <Box
      borderLeft='2px solid transparent'
      borderLeftColor={ active ? 'cyan.500' : 'transparent'}
      margin='.5rem 0'
      p='.5rem 1rem'
    >
      <Link to={to}>
        <Text fontWeight='bold' fontSize='lg'>{title}</Text>
      </Link>
    </Box>
  )
}
