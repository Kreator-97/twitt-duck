import { FC } from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { IconType} from 'react-icons'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  Icon : IconType;
  title: string;
  url ?: string;
}

export const ToolbarOption: FC<Props> = ({Icon, title, url}) => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goToPage = () => {
    if ( url ) navigate(url)
  }

  return (
    <Flex
      alignItems='center'
      gap={{sm: '.5rem', lg: '1rem'}}
      mb={{sm: '2', lg: '4'}}
      color={ url === pathname ? 'blue.500' : 'inherit' }
      cursor='pointer'
      _hover={{ backgroundColor: 'gray.200', color: 'blue.500' }}
      transition='all .2s ease-in-out'
      rounded='md'
      onClick={ () => goToPage() }
    >
      <IconButton
        aria-label='Inicio'
        icon={ <Icon /> }
      />
      <Text
        fontWeight='bold'
        fontSize='lg'
        display={{sm: 'none', lg: 'block'}}
      >{title}</Text>
    </Flex>
  )
}
