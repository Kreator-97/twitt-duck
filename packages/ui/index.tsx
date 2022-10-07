import { ChakraProvider as UIProvider} from '@chakra-ui/react'
import { Navbar, NewPost, Post, SuggestPersons, Tendencies } from './components'
import { theme } from './theme'

export {
  UIProvider,
  Navbar,
  NewPost,
  Post,
  Tendencies,
  SuggestPersons as SuggestPerson,
  theme
}