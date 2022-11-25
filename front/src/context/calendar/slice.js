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
      state.events = state.events.map((event) => (event.id === payload.id ? payload : event))
      state.activeEvent = null
    },

    onDeleteEvent: (state, { payload }) => {
      state.events = state.events.filter((event) => event.id !== payload.id)
      state.activeEvent = null
    },

    onLoadEvents: (state, { payload }) => {
      state.events = payload
    },

    onLogOut: (state) => {
      state.events = []
      state.activeEvent = null
    },
  },
})

export const {
  onSetEventActive,
  onUnsetEventActive,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogOut,
} = calendarSlice.actions
