import { Provider } from 'react-redux'

import { useAppDispatch, useAppSelector } from './app/hooks'
import { store } from './app/store'
import { AuthState, login } from './app/slices/authSlice'
import { UIState, closeSearchBar, openSearchBar } from './app/slices/uiSlice'

export {
  Provider,
  useAppDispatch,
  useAppSelector,
  store,
  login,
  closeSearchBar,
  openSearchBar,
}

export type {
  AuthState,
  UIState,
}