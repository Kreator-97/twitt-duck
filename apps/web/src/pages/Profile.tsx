import { Post, ProfileOption, UserDetail } from '@twitt-duck/ui'
import { ProfileLayout } from '../layouts/ProfileLayout'
import { Box, Grid, Heading } from '@chakra-ui/react'

export const ProfilePage = () => {
  return (
    <ProfileLayout>
      <Box
        style={{
          objectFit: 'cover',
          aspectRatio: '4/1',
          backgroundImage: 'url(https://getwallpapers.com/wallpaper/full/1/7/f/1334809-most-popular-best-4k-wallpapers-1920x1080-download-free.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <UserDetail />
      <Grid
        gridTemplateColumns='280px 1fr'
        gap='1rem'
        marginTop='2rem'
        alignItems='start'
      >
        <Box as='aside'
          boxShadow='md'
          bg='white'
          position='sticky'
          top='.5rem'
        >
          <ProfileOption title='Publicaciones' to='#' active={true} />
          <ProfileOption title='Me gusta' to='#' />
          <ProfileOption title='Media' to='#' />
        </Box>
        <Box
          p='1rem'
          bg='white'
          boxShadow='md'
        >
          <Heading mb="4" as='h2' fontSize='lg'>Publicaciones</Heading>
          <Post />
          <Post />
          <Post />
        </Box>
      </Grid>
    </ProfileLayout>
  )
}
