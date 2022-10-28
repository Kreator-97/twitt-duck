import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader, NewPost, PostsList, UserFeed } from '@twitt-duck/ui'
import { useAllPosts, useFeed } from '@twitt-duck/hooks'

import { AppLayout } from '../layouts'
import { DBLocal } from '../utils'
import { Grid } from '@chakra-ui/react'

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

  if( isLoading ) {
    return <Loader />
  }

  return (
    <AppLayout>
      <Grid
        gap='1rem'
        gridTemplateColumns='1fr'
      >
        <NewPost />
        <UserFeed feed={feed} />
        <PostsList posts={posts} showFeedMessage={true} />
        {/* {
          ( feedLength !== 0 )
            ? (<UserFeed feed={feed} />)
            : (<PostsList posts={posts} showFeedMessage={true} />)
        } */}
      </Grid>
    </AppLayout>
  )
}
