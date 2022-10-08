import { FC } from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import {  IconType } from 'react-icons'

interface Props {
  title?: string;
  count?: number;
  icon?: IconType;
}

export const PostIcon: FC<Props> = ({ icon, title, count }) => {
  return (
    <Flex
      title={title}
      gap='1rem'
      align='center'
      cursor='pointer'
      padding= '.5rem'
      borderRadius='1rem'
      _hover={{
        color: 'red.500',
        bg: 'gray.200',
      }}
    >
      <Icon
        as={icon}
        boxSize={{
          sm: '1rem',
          md: '1.2rem',
        }}
      />
      {
        count && (
          <Text fontWeight='normal'>{count}</Text>
        )
      }
    </Flex>
  )
}