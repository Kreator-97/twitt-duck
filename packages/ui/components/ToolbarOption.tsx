import { FC } from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { IconType} from 'react-icons'
import { useNavigate } from 'react-router-dom'

interface Props {
  Icon : IconType;
  title: string;
  url ?: string;
}

export const ToolbarOption: FC<Props> = ({Icon, title, url}) => {

  const navigate = useNavigate()

  const goToPage = () => {
    if ( url ) navigate(url)
  }

  return (
    <Flex
      alignItems='center'
      gap='1rem'
      mb='4'
      cursor='pointer'
      _hover={{ backgroundColor: 'gray.200', color: 'red.400' }}
      transition='all .2s ease-in-out'
      rounded='md'
      onClick={ () => goToPage() }
    >
      <IconButton
        aria-label='Inicio'
        icon={ <Icon /> }
      />
      <Text fontWeight='bold' fontSize='lg'>{title}</Text>
    </Flex>
  )
}