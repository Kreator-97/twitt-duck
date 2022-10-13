import { createSlice } from '@reduxjs/toolkit'

export interface UIState {
  isSearchBarOpen: boolean;
}

const initialState: UIState = {
  isSearchBarOpen: false
}

export const uiSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    closeSearchBar() {
      return { isSearchBarOpen: false }
    },
    openSearchBar() {
      return { isSearchBarOpen: true }
    }
  }
})

export const { closeSearchBar, openSearchBar } = uiSlice.actions
export default uiSlice.reducer
