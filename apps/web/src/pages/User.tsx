import { useEffect } from 'react'
import { useLocation, useNavigate,  } from 'react-router-dom'
import { useAppSelector } from '@twitt-duck/state'
import { UserInfo } from '@twitt-duck/ui'

import { ProfileLayout } from '../layouts'

export const UserPage = () => {
  const { user } = useAppSelector( state => state.auth)
  const { pathname } = useLocation()
  const username = pathname.split('/')[pathname.split('/').length-1]
  const navigate = useNavigate()

  useEffect(() => {
    if(username === user?.username ) return navigate('/profile', {
      replace: true
    })
  }, [])

  return (
    <ProfileLayout>
      <UserInfo username={ username }/>
    </ProfileLayout>
  )
}
