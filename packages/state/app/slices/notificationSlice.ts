import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Notification} from '../../interfaces'

interface State {
  notifications: Notification[]
}

const initialState: State = {
  notifications: []
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    loadState: (state, action: PayloadAction<Notification[]>) => {
      return {... state, notifications: action.payload}
    },
  }
})

export default notificationSlice.reducer
export const { loadState } = notificationSlice.actions
