import { FC } from 'react'
import { Box} from '@chakra-ui/react'
import { Comment as CommentType } from '@twitt-duck/state'
import { Comment } from '.'

interface Props {
  comments: CommentType[];
}

export const CommentsList: FC<Props> = ({comments}) => {

  return (
    <Box
      bgColor='white'
      boxShadow='md'
    >
      {
        comments.map( comment => {
          return (
            <Comment key={comment.id} comment={comment} />
          )
        })
      }
    </Box>
  )
}
