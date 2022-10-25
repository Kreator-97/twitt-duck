import { FC } from 'react'
import { Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface Props {
  imgURL: string;
  name: string;
  to?: string;
}

export const UserAvatar: FC<Props> = ({name, imgURL, to}) => {
  const navigate = useNavigate()

  const goToPage = (url: string) => {
    navigate(url)
  }

  return (
    <Avatar
      size={{ base: 'sm', sm: 'md' }}
      name={name}
      src={imgURL}
      onClick={() => { to && goToPage(to) }}
      cursor='pointer'
    />
  )
}

