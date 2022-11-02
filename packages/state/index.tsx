import { Provider } from 'react-redux'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { AuthState, finishChecking, login } from './app/slices/authSlice'
import { loadState } from './app/slices/notificationSlice'
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
  Notification,
  Post,
  Repost,
  User,
} from './interfaces'

import { SocketProvider, SocketContext } from './context'

export {
  closeConfirmLogoutModal,
  closeRemoveRepostModal,
  closeSearchBar,
  closeVisorImage,
  finishChecking,
  login,
  loadState,
  openConfirmLogoutModal,
  openRemoveRepostModal,
  openSearchBar,
  openVisorImage,
  Provider,
  store,
  SocketContext,
  SocketProvider,
  useAppDispatch,
  useAppSelector,
}

export type {
  AuthState,
  Comment,
  Follow,
  Images,
  Notification,
  Like,
  Post,
  Repost,
  UIState,
  User,
  Feed,
}