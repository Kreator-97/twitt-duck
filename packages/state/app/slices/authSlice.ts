import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces';

export interface AuthState {
  logged: boolean;
  user: User | null;
}

const initialState: AuthState = {
  logged: false,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      return { logged: true, user: action.payload }
    },
  }
})

export const { login } = authSlice.actions
export default authSlice.reducer
