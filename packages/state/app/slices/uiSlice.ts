import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../interfaces';

export interface UIState {
  isSearchBarOpen: boolean;
  isConfirmLogoutModalOpen: boolean;
  imageVisor: ImageVisor;
  postVisor: PostVisor;
  isRemoveRepostModalOpen: RepostModal;
}

const initialState: UIState = {
  isSearchBarOpen: false,
  isConfirmLogoutModalOpen: false,
  isRemoveRepostModalOpen: {
    isOpen: false,
    repostId: undefined,
  },
  imageVisor: {
    imageURL: undefined,
    isOpen: false
  },
  postVisor: {
    isOpen: false,
    post: null
  }
}

type ImageVisor = {
  imageURL: string;
  isOpen: true
} | {
  imageURL: undefined;
  isOpen: false;
}

type PostVisor = {
  post: Post;
  isOpen: true;
} | {
  post: null | undefined;
  isOpen: false;
}

type RepostModal = {
  repostId: string | undefined;
  isOpen: boolean;
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
    openRemoveRepostModal(state, action: PayloadAction<string>) {
      return { ...state, isRemoveRepostModalOpen: { isOpen: true, repostId: action.payload } }
    },
    closeRemoveRepostModal(state) {
      return { ...state, isRemoveRepostModalOpen: { isOpen: false, repostId: undefined } }
    },
  }
})

export const {
  closeSearchBar,
  openSearchBar,
  closeConfirmLogoutModal,
  openConfirmLogoutModal,
  openVisorImage,
  closeVisorImage,
  openRemoveRepostModal,
  closeRemoveRepostModal
} = uiSlice.actions

export default uiSlice.reducer
