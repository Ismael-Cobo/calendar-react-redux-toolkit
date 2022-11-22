import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

import { onChecking, onLogin, onLogout } from '../context/auth/slice'
import { addNotification } from '../context/notification'

import calendarApi from '../api/calendarApi'

import { notificationTypes } from '../notifaction'

export const useAuthStore = () => {
  const dispatch = useDispatch()

  const { status, user } = useSelector((state) => state.auth)

  const startLogin = async ({ email: emailDB, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await calendarApi.post('/auth/login', { email: emailDB, password })

      const { id, email: email, name, token } = data.data
      localStorage.setItem('token', token)
      dispatch(onLogin({ _id: id, email, name }))
      dispatch(addNotification({ id: v4(), type: notificationTypes.success, message: 'Bienvenido!' }))
      return
    } catch (error) {
      const { msg } = error.response.data

      dispatch(addNotification({ id: v4(), type: notificationTypes.error, message: msg }))
      dispatch(onLogout())
    }
  }

  const startRegister = async ({ name: nameDB, email: emailDB, password }) => {
    dispatch(onChecking())
    try {
      const { data } = await calendarApi.post('/auth/register', { name: nameDB, email: emailDB, password })

      const { id, email: email, name, token } = data.data
      localStorage.setItem('token', token)
      dispatch(onLogin({ _id: id, email, name }))
      dispatch(addNotification({ id: v4(), type: notificationTypes.success, message: 'Bienvenido!' }))
      return
    } catch (error) {
      const { msg } = error.response.data

      dispatch(addNotification({ id: v4(), type: notificationTypes.error, message: msg }))
      dispatch(onLogout())
    }
  }

  const checkingAuthToken = async () => {
    const token = localStorage.getItem('token')

    if (!token) dispatch(onLogout())
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.get('/auth/renew', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      const { token, email, name, id } = data.data
      localStorage.setItem('token', token)
      dispatch(onLogin({ _id: id, email, name }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogOut = () => {
    dispatch(onLogout())
    localStorage.clear()
  }

  return {
    status,
    user,

    startLogin,
    startRegister,
    checkingAuthToken,
    startLogOut,
  }
}
