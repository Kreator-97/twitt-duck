import { Provider } from 'react-redux'

import { useAppDispatch, useAppSelector } from './app/hooks'
import { store } from './app/store'
import { AuthState, login } from './app/slices/authSlice'
import { UIState, closeSearchBar, openSearchBar, openConfirmLogoutModal, closeConfirmLogoutModal } from './app/slices/uiSlice'
import { Post, User } from './interfaces'

export {
  Provider,
  useAppDispatch,
  useAppSelector,
  store,
  login,
  closeSearchBar,
  openSearchBar,
  closeConfirmLogoutModal,
  openConfirmLogoutModal
}

export type {
  AuthState,
  UIState,
  Post,
  User
}