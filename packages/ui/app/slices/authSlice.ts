import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  logged: boolean;
}

const initialState: AuthState = {
  logged: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login() {
      return { logged: true }
    },
  }
})

export const { login } = authSlice.actions
export default authSlice.reducer
