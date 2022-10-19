import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces';

export interface AuthState {
  logged: boolean;
  isChecking: boolean;
  user: User | null;
}

const initialState: AuthState = {
  logged: false,
  isChecking: true,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      return { logged: true, isChecking: false, user: action.payload }
    },
    finishChecking(state) {
      return { ...state, isChecking: false }
    }
  }
})

export const { login, finishChecking } = authSlice.actions
export default authSlice.reducer
