import { FC, MouseEvent } from 'react'
import { MdShare } from 'react-icons/md'
import { Box, Flex } from '@chakra-ui/react'
import { Comment, Like, useAppSelector } from '@twitt-duck/state'
import { toogleLikePost } from '@twitt-duck/services'

import { AiOutlineRetweet } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { HiOutlineHeart } from 'react-icons/hi'

import { PostIcon } from './PostIcon'

interface Props {
  postId  : string;
  comments: Comment[];
  reposts : number;
  likes   : Like[];
  onLikeCompleted?: () => void
}

export const PostActions: FC<Props> = ({ comments, likes, reposts, postId, onLikeCompleted }) => {
  const { user } = useAppSelector(state => state.auth)

  const onLikePost = async (e: MouseEvent<HTMLDivElement> ) => {
    e.stopPropagation()

    const token = localStorage.getItem('token')

    try {
      await toogleLikePost(postId, token || '')
      onLikeCompleted && onLikeCompleted()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex
      gap='1rem'
      justify='space-evenly'
      alignItems='center'
      margin='0 auto'
      maxWidth='600px'
      width='100%'
    >
      <Box>
        <PostIcon
          icon={BiCommentDetail}
          title='Comentar'
          count={ comments ? comments.length : 0 }
        />
      </Box>
      <Box>
        <PostIcon
          icon={AiOutlineRetweet}
          title='Debatir'
          count={reposts}
        />
      </Box>
      <Box>
        <PostIcon
          active={ likes.some( like => like.user.id === user?.id) }
          icon={HiOutlineHeart}
          title='Me gusta'
          count={likes.length}
          onClick={ onLikePost }
        />
      </Box>
      <Box>
        <PostIcon
          icon={MdShare}
          title='Compatir'
        />
      </Box>
    </Flex>
  )
}
