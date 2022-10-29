import { FC } from 'react'
import { AspectRatio, Box, Grid } from '@chakra-ui/react'
import { Images, openVisorImage, useAppDispatch } from '@twitt-duck/state'

interface Props {
  images: Images[]
}

export const Gallery: FC<Props> = ({images}) => {
  const dispatch = useAppDispatch()

  const onOpenImage = (imageURL: string) => {
    dispatch(openVisorImage(imageURL))
  }

  return (
    <Grid
      overflow='hidden'
      border='1px solid #ccc'
      rounded='xl'
      gap='.25rem'
      gridTemplateColumns={ images.length === 1 ? '1fr' : '1fr 1fr' }
      gridTemplateRows={{
        base: images.length > 2 ? '150px 150px' : '1fr',
        md: images.length > 2 ? '200px 200px' : '1fr',
        lg: images.length > 2 ? '300px 300px' : '1fr'
      }}
    >
      {
        images.map((image, i) => {
          return (
            <AspectRatio
              // original ratio when length is 1, 1/1 when length !== 1
              ratio={images.length === 1 ? undefined : 1 }
              key={image.id}
              gridColumnStart={ (images.length === 3 && i === 2) ? 'span 2' : '' }
              onClick={ (e) => { e.stopPropagation(); onOpenImage(image.url) } }
            >
              <Box
                cursor='pointer'
                backgroundImage={`url('${image.url}')`}
                backgroundRepeat='no-repeat'
                backgroundPosition='center'
                backgroundSize='cover'
              />
            </AspectRatio>
          )
        })
      }
    </Grid>
  )
}
