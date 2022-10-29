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

  if( isLoading ) {
    return <Loader />
  }

  return (
    <Tabs
      colorScheme='cyan'
      mb='4'
    >
      <TabList>
        <Tab>Publicaciones</Tab>
        <Tab>Me gustas</Tab>
        <Tab>Galeria</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PostsList posts={posts} showFeedMessage={false} />
          {
            (posts.length === 0) &&
              (
                <Heading
                  as='h3'
                  fontSize='sm'
                  textAlign='center'
                >No existen publicaciones hechas
                </Heading>
              )
          }
        </TabPanel>
        <TabPanel>
          <PostsList posts={likedPost} showFeedMessage={false} />
          {
            (likes.length === 0) &&
            (
              <Heading
                as='h3'
                fontSize='sm'
                textAlign='center'
              >Sin información disponible
              </Heading>
            )
          }
        </TabPanel>
        <TabPanel>
          <Gallery images={images} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
