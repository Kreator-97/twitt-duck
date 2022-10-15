import { createSlice } from '@reduxjs/toolkit'

export interface UIState {
  isSearchBarOpen: boolean;
  isConfirmLogoutModalOpen: boolean,
}

const initialState: UIState = {
  isSearchBarOpen: false,
  isConfirmLogoutModalOpen: false,
}

export const uiSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    closeSearchBar(state) {
      return { ...state, isSearchBarOpen: false }
    },
    openSearchBar(state) {
      return { ...state, isSearchBarOpen: true }
    },
    closeConfirmLogoutModal(state) {
      return { ...state, isConfirmLogoutModalOpen: false }
    },
    openConfirmLogoutModal(state) {
      return { ...state, isConfirmLogoutModalOpen: true }
    },
  }
})

export const { closeSearchBar, openSearchBar, closeConfirmLogoutModal, openConfirmLogoutModal } = uiSlice.actions
export default uiSlice.reducer
