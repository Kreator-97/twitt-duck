import { Provider } from 'react-redux'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { AuthState, finishChecking, login } from './app/slices/authSlice'
import { store } from './app/store'

import {
  closeConfirmLogoutModal,
  closeRemoveRepostModal,
  closeSearchBar,
  closeVisorImage,
  openConfirmLogoutModal,
  openRemoveRepostModal,
  openSearchBar,
  openVisorImage,
  UIState,
} from './app/slices/uiSlice'

import {
  Comment,
  Feed,
  Follow,
  Images,
  Like,
  Post,
  Repost,
  User,
} from './interfaces'

export {
  closeConfirmLogoutModal,
  closeRemoveRepostModal,
  closeSearchBar,
  closeVisorImage,
  finishChecking,
  login,
  openConfirmLogoutModal,
  openRemoveRepostModal,
  openSearchBar,
  openVisorImage,
  Provider,
  store,
  useAppDispatch,
  useAppSelector,
}

export type {
  AuthState,
  Comment,
  Follow,
  Images,
  Like,
  Post,
  Repost,
  UIState,
  User,
  Feed,
}