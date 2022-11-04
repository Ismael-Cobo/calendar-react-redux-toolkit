import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
