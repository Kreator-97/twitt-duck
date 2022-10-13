import { FC, ChangeEvent } from 'react'
import { Input } from '@chakra-ui/react'

interface Props {
  placehorder: string;
  name    ?: string;
  value   ?: string;
  required?: boolean;
  type    ?: 'text' | 'email' | 'password';
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const FormInput: FC<Props> = ({placehorder, name, value, required, onChange, type = 'text' }) => {

  return (
    <Input
      required={required}
      name={name}
      placeholder={ placehorder }
      type={type}
      border='none'
      onChange={ onChange }
      value={ value }
      sx={{
        boxShadow: '2px 2px 8px #ddd, -2px -2px 8px #fff',
      }}
      _focus={{
        boxShadow: '2px 2px 8px #ddd, -2px -2px 8px #fff',
        outline: '1px solid hsla(210,90%,50%,.5)'
      }}
      _placeholder={{
        color: '#333'
      }}
    />
  )
}
