import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetEventActive: (state, { payload }) => {
      state.activeEvent = payload
    },

    onUnsetEventActive: (state) => {
      state.activeEvent = null
    },

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },

    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => (event._id === payload._id ? payload : event))
    },

    onDeleteEvent: (state, { payload }) => {
      state.events = state.events.filter((event) => event._id !== payload)
      state.activeEvent = null
    },

    onLoadEvents: (state, { payload }) => {
      state.events = payload
    },
  },
})

export const { onSetEventActive, onUnsetEventActive, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } =
  calendarSlice.actions
