import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [
      {
        _id: new Date().getTime(),
        title: 'Cumpleaños del jefedfhjkljhgfdfghjkl',
        start: new Date(),
        end: addHours(new Date(), 2),
        user: {
          _id: 123,
          name: 'Ismael',
        },
      },
    ],
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
  },
})

export const { onSetEventActive, onUnsetEventActive, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions
