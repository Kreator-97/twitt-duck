import { useEffect } from 'react'
import { useLocation, useNavigate,  } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'
import { useAppSelector } from '@twitt-duck/state'
import { CustomTabs, Post } from '@twitt-duck/ui'

import { useUserPosts } from '../hooks/useUserPost'
import { ProfileLayout } from '../layouts'

export const UserPage = () => {
  const { user } = useAppSelector( state => state.auth)
  const { pathname } = useLocation()
  const username = pathname.split('/')[pathname.split('/').length-1]
  const navigate = useNavigate()

  const { posts } = useUserPosts(username)

  useEffect(() => {
    if(username === user?.username ) return navigate('/profile', {
      replace: true
    })
  }), []

  return (
    <ProfileLayout>
      <Box
        p={0}
        zIndex={100}
        bg='white'
        position='sticky'
        top='0'
      >
        <CustomTabs />
      </Box>

      {
        (posts.length === 0) &&
          ( <Heading as='h3' fontSize='md'>No existen publicaciones hechas</Heading> )
      }
      {
        posts.map((post) => {
          return (
            <Post key={post.id} post={post}/>
          )
        })
      }
    </ProfileLayout>
  )
}
