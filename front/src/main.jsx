import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { CalendarApp } from './CalendarApp'

import { store } from './context'

import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <CalendarApp />
  </Provider>
  // </React.StrictMode>
)
