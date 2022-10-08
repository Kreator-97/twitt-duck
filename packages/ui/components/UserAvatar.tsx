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
      src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'
      onClick={() => { to && goToPage(to) }}
      cursor='pointer'
    />
  )
}

