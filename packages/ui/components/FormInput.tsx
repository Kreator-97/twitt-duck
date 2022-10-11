import { Input } from '@chakra-ui/react'
import { FC } from 'react'

interface Props {
  placehorder: string;
  type?: 'text' | 'email' | 'password'
}

export const FormInput: FC<Props> = ({placehorder, type = 'text' }) => {
  return (
    <Input
      placeholder={ placehorder }
      type={type}
      border='none'
      sx={{
        boxShadow: '2px 2px 8px #ddd, -2px -2px 8px #fff',
      }}
      // _focus={{
      //   boxShadow: '2px 2px 8px #ddd, -2px -2px 8px #fff',
      //   outline: '1px solid hsla(210,90%,50%,.5)'
      // }}
      // _placeholder={{
      //   color: '#333'
      // }}
    />
  )
}
