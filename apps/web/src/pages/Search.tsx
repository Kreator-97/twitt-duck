import { useLocation } from 'react-router-dom'
import { Box, Heading, Text } from '@chakra-ui/react'
import { Follow, Loader, PostsList } from '@twitt-duck/ui'
import { useSearch } from '@twitt-duck/hooks'

import { AppLayout } from '../layouts'

export const SearchPage = () => {
  const { search } = useLocation()
  let query = ''

  if( search.includes('?query') ) {
    query = search.split('=')[1].replaceAll('%20', ' ')
  }

  const { posts, users, isLoading } = useSearch(query)

  if( isLoading ) return <Loader />

  return (
    <AppLayout>
      <Box
        bgColor='white'
        p={{ base: 2, md: 4 }}
        mb={{ base: 2, md: 4 }}
      >
        <Heading
          as='h2'
          fontSize='md'
          textAlign='center'
          fontWeight={400}
        >
          Resultados de búsqueda para &quot;
          <Text as='span' fontWeight='bold' color='blue.500'>
            { query.toString() }
          </Text>&quot;
        </Heading>
      </Box>

      <Box
        bgColor='white'
        p={{ base: 2, md: 4 }}
        display={ users.length === 0 ? 'none' : 'block' }
      >
        <Heading
          as='h3'
          fontSize='md'
          textAlign='center'
          mb={2}
        >
          Usuarios encontrados
        </Heading>
        {
          users.map((user) => {
            return (
              <Follow
                key={user.id}
                imgURL={user.profilePic}
                name={user.fullname}
                username={user.username}
                description={user.description}
              />
            )
          })
        }
      </Box>

      <Box
        bgColor='white'
        p={{ base: 2, md: 4 }}
        display={ posts.length === 0 ? 'none' : 'block' }
      >
        <Heading
          as='h3'
          fontSize='md'
          textAlign='center'
          mb={2}
        >
          Publicaciones encontradas
        </Heading>
        <PostsList posts={posts} />
      </Box>
    </AppLayout>
  )
}
