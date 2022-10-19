import { ChangeEvent, FC } from 'react'
import './Textarea.css'

interface Props {
  value     : string;
  onChange? : (e:ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea: FC<Props> = ({ onChange, value }) => {
  return (
    <textarea
      onChange={ (e) => onChange && onChange(e) }
      className='textarea'
      placeholder='¿Qué está pasando?'
      value={ value }
    ></textarea>
  )
}
