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
    addNotification: (state, action: PayloadAction<Notification>) => {
      return {notifications: [...state.notifications, action.payload]}
    },
    removeNotification: ( state, action: PayloadAction<string> ) => {
      return {
        ...state,
        notifications: state.notifications.filter( notification => notification.id !== action.payload)
      }
    }
  }
})

export default notificationSlice.reducer
export const { addNotification, removeNotification, loadState } = notificationSlice.actions
