import { Box, Grid, Heading } from '@chakra-ui/react'
import { usePublicFeed, useSuggestedPeople } from '@twitt-duck/hooks'
import { Loader, PostsList } from '@twitt-duck/ui'
import { Follow } from '@twitt-duck/ui/components'

import { AppLayout } from '../layouts'

export const ExplorePage = () => {
  const { posts, isLoading } = usePublicFeed()
  const { users: suggestedUsers } = useSuggestedPeople()

  if( isLoading ) return <Loader />

  return (
    <AppLayout>
      <Grid
        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
        p={{ base: 2, md: 4 }}
        bgColor='white'
        gap='1rem'
      >
        <Heading
          fontSize='md'
          textAlign='center'
          mb='4'
          gridColumnStart='span 2'
        >
          Usuarios que puedes seguir
        </Heading>
        {
          suggestedUsers.map((user) => {
            return (
              <Follow key={user.id} name={user.fullname} imgURL={user.profilePic} username={user.username} description={user.description} />
            )
          })
        }
      </Grid>
      <Box
        p={{ base: 2, md: 4 }}
        bgColor='white'
      >
        <Heading
          fontSize='md'
          textAlign='center'
          mb='4'
        >Publicaciones que te puede interesar</Heading>
        <PostsList posts={posts} />
      </Box>
    </AppLayout>
  )
}
