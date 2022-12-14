import { Box, Grid, Heading } from '@chakra-ui/react'
import { usePublicFeed, useSuggestedPeople } from '@twitt-duck/hooks'
import { Loader, PostsList } from '@twitt-duck/ui'
import { Follow } from '@twitt-duck/ui'

import { AppLayout } from '../layouts'

export const ExplorePage = () => {
  const { posts, isLoading } = usePublicFeed()
  const { users: suggestedUsers } = useSuggestedPeople()

  if( isLoading ) return <Loader />

  return (
    <AppLayout>
      <Grid
        gridTemplateColumns='1fr'
        p={{ base: 2, md: 4 }}
        bgColor='white'
      >
        <Heading
          fontSize='md'
          textAlign='center'
          color='#333'
          paddingBottom='4'
          borderBottom='1px solid'
          borderColor='gray.300'
        >
          Usuarios que puedes seguir
        </Heading>
        {
          suggestedUsers.map((user) => {
            return (
              <Box
                key={user.id}
                borderBottom='1px solid'
                borderColor='gray.200'
              >
                <Follow
                  name={user.fullname}
                  imgURL={user.profilePic}
                  username={user.username}
                  description={user.description}
                />
              </Box>
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
          color='#333'
        >
          Publicaciones que te pueden interesar
        </Heading>
        <PostsList posts={posts} />
      </Box>
    </AppLayout>
  )
}
