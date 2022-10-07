import { NewPost, Post } from '@twitt-duck/ui'
import { AppLayout } from '../layouts/AppLayout'

export const HomePage = () => {

  return (
    <AppLayout>
      <div>
        <NewPost />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </AppLayout>
  )
}
