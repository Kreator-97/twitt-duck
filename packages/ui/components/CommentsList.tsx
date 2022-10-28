import { FC } from 'react'
import { Box} from '@chakra-ui/react'
import { Comment as CommentType, Post } from '@twitt-duck/state'
import { Comment } from '.'

interface Props {
  comments: CommentType[];
  post    : Post;
}

export const CommentsList: FC<Props> = ({comments, post}) => {

  return (
    <Box
      bgColor='white'
      boxShadow='md'
    >
      {
        comments.map( comment => {
          return (
            <Comment key={comment.id} comment={comment} post={post} />
          )
        })
      }
    </Box>
  )
}
