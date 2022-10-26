import { FC, MouseEvent, useMemo } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Comment, Like, Repost, useAppSelector } from '@twitt-duck/state'
import { AiOutlineRetweet } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { HiOutlineHeart } from 'react-icons/hi'

import { PostIcon } from './PostIcon'

interface Props {
  comments  : Comment[];
  likes     : Like[];
  reposts   : Repost[];
  actionId  : string;
  type      : 'comment' | 'post';
  onLikeEvent?: (actionId: string) => void;
  onRepostEvent?: (actionId: string, type: 'comment' | 'post') => void;
  onRepostCancelEvent?: (actionId: string, type: 'comment' | 'post') => void;
}

// this component perform all actions over the Post or comment passed as actionId:
// actiones likes, reposts, comment

export const PostActions: FC<Props> = ({ comments, likes, reposts, actionId, type, onLikeEvent, onRepostEvent, onRepostCancelEvent }) => {
  const { user } = useAppSelector(state => state.auth)
  
  const repostActive = useMemo(() => reposts.some( repost => repost.author.id === user?.id), [reposts])

  const onLikePost = async (e: MouseEvent<HTMLDivElement> ) => {
    e.stopPropagation()
    onLikeEvent && onLikeEvent(actionId)
  }

  const onRepost = async (e: MouseEvent<HTMLDivElement> ) => {
    e.stopPropagation()

    if( repostActive ) {
      onRepostCancelEvent && onRepostCancelEvent(actionId, type)
      return
    }
    
    onRepostEvent && onRepostEvent(actionId, type)
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
          active={ repostActive }
          icon={AiOutlineRetweet}
          title='Difundir'
          count={ reposts.length }
          onClick={ onRepost }
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
    </Flex>
  )
}
