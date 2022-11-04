import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../auth/pages'
import { CalendarPage } from '../calendar/pages'

export const AppRouter = () => {
  const authStatus = 'authenticated'

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <Route path='/auth/*' element={<Login />} />
      ) : (
        <Route path='/*' element={<CalendarPage />} />
      )}
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
