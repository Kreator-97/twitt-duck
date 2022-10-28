import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader, NewPost, PostsList, UserFeed } from '@twitt-duck/ui'
import { useAllPosts, useFeed } from '@twitt-duck/hooks'
import { Grid } from '@chakra-ui/react'

import { AppLayout } from '../layouts'
import { DBLocal } from '../utils'

export const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( !user ) {
      navigate('/auth/login')
    }
  }, [])

  const { feed, isLoading }= useFeed()
  const { posts }= useAllPosts()

  if( isLoading ) return <Loader />

  return (
    <AppLayout>
      <Grid
        gap='1rem'
        gridTemplateColumns='1fr'
      >
        <NewPost />
        {
          Object.keys(feed).length !== 0 && (
            <UserFeed feed={feed} />
          )
        }
        <PostsList posts={posts} showFeedMessage={true} />
      </Grid>
    </AppLayout>
  )
}
