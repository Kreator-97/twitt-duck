import { FC, MouseEvent } from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import {  IconType } from 'react-icons'

interface Props {
  title?: string;
  count?: number;
  icon?: IconType;
  onClick?: (e:MouseEvent<HTMLDivElement>) => void
  active?: boolean;
}

export const PostIcon: FC<Props> = ({ icon, title, count, onClick, active = false }) => {
  return (
    <Flex
      onClick={ (e) => onClick && onClick(e) }
      title={title}
      gap='1rem'
      align='center'
      cursor='pointer'
      padding= '.5rem'
      borderRadius='1rem'
      color={ active ? 'red.500' : '#333' }
      _hover={{
        color: 'red.500',
        bg: 'gray.200',
      }}
    >
      <Icon
        color={ active ? 'red.500' : 'inherit' }
        as={icon}
        boxSize={{
          sm: '1rem',
          md: '1.2rem',
        }}
      />
      {
        count && ( <Text fontWeight='normal'>{count}</Text> )
      }
    </Flex>
  )
}
