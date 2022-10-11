import { FC } from 'react'
import { IconType } from 'react-icons'
import { Box, IconButton } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  Icon   : IconType;
  label  : string;
  to    ?: string;
  onClick?:() => void;
}

export const BottomBarIcon: FC<Props> = ({Icon, label, to, onClick}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Box
      onClick={ () => {
        to && navigate(to) 
        onClick && onClick()
      }}
    >
      <IconButton
        size={{ base: 'sm', sm: 'md' }}
        aria-label={label}
        icon={ <Icon />}
        color={ pathname === to ? 'cyan.600' : 'inherit' }
        _hover={{
          color: 'red.400',
          backgroundColor: 'gray.200'
        }}
      />
    </Box>
  )
} 
