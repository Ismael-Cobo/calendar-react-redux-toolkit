import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // authenticated, not-authenticated
    user: {},
  },
  reducers: {
    onLogin: (state, { payload }) => {
      state.user = payload
      state.status = 'authenticated'
    },

    onLogout: (state) => {
      state.user = {}
      state.status = 'not-authenticated'
    },

    onChecking: (state) => {
      state.user = {}
      state.status = 'checking'
    },
  },
})

export const { onLogin, onLogout, onChecking } = authSlice.actions
