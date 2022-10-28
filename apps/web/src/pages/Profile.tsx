import { CustomTabs, Loader, PostsList,} from '@twitt-duck/ui'
import { Box, Heading } from '@chakra-ui/react'
import { useAppSelector } from '@twitt-duck/state'
import { useUserPosts } from '@twitt-duck/hooks'

import { ProfileLayout } from '../layouts/ProfileLayout'

export const ProfilePage = () => {
  const { user } = useAppSelector( state => state.auth )
  const { posts, isLoading } = useUserPosts(user?.username || '')

  if( isLoading ) {
    return <Loader />
  }

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
          ( <Heading
            as='h3'
            fontSize='md'
            textAlign='center'
          >No existen publicaciones hechas
          </Heading> )
      }
      <PostsList posts={posts} />
    </ProfileLayout>
  )
}
