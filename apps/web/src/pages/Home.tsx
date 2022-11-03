import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader, NewPost, PostsList, UserFeed } from '@twitt-duck/ui'
import { useFeed, useNotifications, usePublicFeed } from '@twitt-duck/hooks'
import { loadState, SocketContext, useAppDispatch } from '@twitt-duck/state'
import { Grid } from '@chakra-ui/react'

import { AppLayout } from '../layouts'
import { DBLocal } from '../utils'

export const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { notifications } = useNotifications()

  const { reloadSocket } = useContext(SocketContext)

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( !user ) {
      navigate('/auth/login')
    }
  }, [])

  useEffect(() => {
    reloadSocket()
  }, [])

  const { feed, isLoading }= useFeed()
  const { posts } = usePublicFeed()

  useEffect(() => {
    if( notifications ) {
      dispatch( loadState(notifications) )
    }
  }, [notifications])

  if( isLoading ) return <Loader />

  return (
    <AppLayout>
      <Grid
        gap={{base: '.5rem', lg: '1rem' }}
        gridTemplateColumns='1fr'
      >
        <NewPost />
        {
          Object.keys(feed).length !== 0 && (
            <UserFeed feed={feed} />
          )
        }
        {
          ( posts.length !== 0 ) && (
            <PostsList posts={posts} showFeedMessage={true} />
          )
        }
      </Grid>
    </AppLayout>
  )
}
