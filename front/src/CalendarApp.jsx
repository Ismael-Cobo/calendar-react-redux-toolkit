import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

import { NotificationProvider } from './notifaction'

import 'bootstrap/dist/css/bootstrap.min.css'

export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      <NotificationProvider />
    </BrowserRouter>
  )
}
