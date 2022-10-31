import { FC, useMemo } from 'react'
import { useUserInfo } from '@twitt-duck/hooks'
import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'

import { Gallery, Loader, PostsList } from '.'

interface Props {
  username: string;
}

export const UserInfo: FC<Props> = ({username}) => {
  const { posts, likes, images, isLoading } = useUserInfo(username)
  
  const likedPost = useMemo(() => {
    return likes.map(like => like.post)
  }, [likes])

  if( isLoading ) return <Loader />

  return (
    <Tabs
      colorScheme='blue'
    >
      <TabList>
        <Tab>Publicaciones</Tab>
        <Tab>Me gustas</Tab>
        <Tab>Galeria</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p='0'>
          <PostsList posts={posts} showFeedMessage={false} />
          {
            (posts.length === 0) &&
              (
                <Heading
                  as='h3'
                  fontSize='sm'
                  textAlign='center'
                  p={2}
                  mt={2}
                >No existen publicaciones hechas
                </Heading>
              )
          }
        </TabPanel>
        <TabPanel
          p={{ base: '.5rem 0 0', md: '1rem 0 0' }}
        >
          <PostsList posts={likedPost} showFeedMessage={false} />
          {
            (likes.length === 0) &&
            (
              <Heading
                as='h3'
                fontSize='sm'
                textAlign='center'
                p={2}
                mt={2}
              >
                Sin información disponible
              </Heading>
            )
          }
        </TabPanel>
        <TabPanel
          p={{ base: '.5rem 0 0', md: '1rem 0 0' }}
        >
          {
            images.length > 0 && (
              <Gallery images={images} />
            )
          }
          {
            (images.length === 0) &&
            (
              <Heading
                as='h3'
                fontSize='sm'
                textAlign='center'
                p={2}
                mt={2}
              >
                Sin información disponible
              </Heading>
            )
          }
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
