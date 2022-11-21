import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './ui'
import { calendarSlice } from './calendar'
import { notificationSlice } from './notification'
import { authSlice } from './auth'

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    notification: notificationSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
