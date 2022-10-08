import { FC } from 'react'
import { IconType } from 'react-icons'
import { Box, IconButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface Props {
  Icon   : IconType;
  label  : string;
  active?: boolean;
  to    ?: string;
}

export const BottomBarIcon: FC<Props> = ({Icon, label, active, to}) => {
  const navigate = useNavigate()

  return (
    <Box
      onClick={ () => { to && navigate(to)} }
    >
      <IconButton
        size={{ base: 'sm', sm: 'md' }}
        aria-label={label}
        icon={ <Icon />}
        color={ active ? 'cyan.600' : 'inherit' }
        _hover={{
          color: 'red.400',
          backgroundColor: 'gray.200'
        }}
      />
    </Box>
  )
} 
