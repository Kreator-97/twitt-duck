import { Provider } from 'react-redux'

import { useAppDispatch, useAppSelector } from './app/hooks'
import { store } from './app/store'
import { AuthState, finishChecking, login } from './app/slices/authSlice'
import { UIState, closeSearchBar, openSearchBar, openConfirmLogoutModal, closeConfirmLogoutModal, closeVisorImage, openVisorImage } from './app/slices/uiSlice'
import { Post, User } from './interfaces'

export {
  Provider,
  useAppDispatch,
  useAppSelector,
  store,
  login,
  finishChecking,
  closeSearchBar,
  openSearchBar,
  closeConfirmLogoutModal,
  openConfirmLogoutModal,
  closeVisorImage,
  openVisorImage,
}

export type {
  AuthState,
  UIState,
  Post,
  User
}