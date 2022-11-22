import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../auth/pages'
import { CalendarPage } from '../calendar/pages'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {
  const { checkingAuthToken, status } = useAuthStore()

  useEffect(() => {
    checkingAuthToken()
  }, [])

  if (status === 'checking') {
    return <h3>Cargando...</h3>
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path='/auth/*' element={<Login />} />
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          <Route path='/' element={<CalendarPage />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  )
}
