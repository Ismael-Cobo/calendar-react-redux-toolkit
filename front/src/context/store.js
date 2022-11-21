import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from './ui'
import { calendarSlice } from './calendar'
import { notificationSlice } from './notification'

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    notification: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
