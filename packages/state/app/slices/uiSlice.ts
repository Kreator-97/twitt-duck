import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  isSearchBarOpen: boolean;
  isConfirmLogoutModalOpen: boolean;
  imageVisor: ImageVisor
}

const initialState: UIState = {
  isSearchBarOpen: false,
  isConfirmLogoutModalOpen: false,
  imageVisor: {
    imageURL: undefined,
    isOpen: false
  },
}

type ImageVisor = {
  imageURL: string;
  isOpen: true
} | {
  imageURL: undefined;
  isOpen: false;
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
    openVisorImage(state, action: PayloadAction<string> ) {
      return { ...state, imageVisor: { imageURL: action.payload, isOpen: true } }
    },
    closeVisorImage(state) {
      return { ...state, imageVisor: { imageURL: undefined, isOpen: false } }
    },
  }
})

export const { closeSearchBar, openSearchBar, closeConfirmLogoutModal, openConfirmLogoutModal, openVisorImage, closeVisorImage } = uiSlice.actions
export default uiSlice.reducer
