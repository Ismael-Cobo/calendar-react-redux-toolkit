import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, { payload }) => {
      state.notifications.push(payload)
    },
    removeNotification: (state, { payload }) => {
      state.notifications = state.notifications.filter((el) => {
        el.id !== payload.id
      })
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions
