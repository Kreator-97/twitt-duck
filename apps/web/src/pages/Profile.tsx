import { CustomTabs, Post, Toolbar, UserDetail } from '@twitt-duck/ui'
import { Box, Grid } from '@chakra-ui/react'
import { ProfileLayout } from '../layouts/ProfileLayout'

export const ProfilePage = () => {
  return (
    <ProfileLayout>
      <Box
        minHeight={{
          base: '200px',
          sm: '250px',
          md: '300px',
          lg: '400px'
        }}
        objectFit='cover'
        style={{
          objectFit: 'cover',
          backgroundImage: 'url(https://getwallpapers.com/wallpaper/full/1/7/f/1334809-most-popular-best-4k-wallpapers-1920x1080-download-free.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <UserDetail />
      <Grid
        gridTemplateColumns={{ base: '1fr', md: 'auto 1fr', lg: '240px 1fr' }}
        gap='1rem'
        alignItems='start'
        margin='0 auto'
        maxWidth='1280px'
        justifyContent='start'
      >
        <Toolbar />
        <Box
          p='1rem'
          bg='white'
          boxShadow='md'
          rounded='md'
        >

          <Box
            p={0}
            zIndex={100}
            bg='white'
            position='sticky'
            top='0'
          >
            <CustomTabs />
          </Box>

          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </Box>
      </Grid>
    </ProfileLayout>
  )
}
