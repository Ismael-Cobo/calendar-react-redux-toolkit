import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

import { addNotification, removeNotification } from '../context/notification'

export const useNotificationStore = () => {
  const dispatch = useDispatch()

  const { notifications } = useSelector((state) => state.notification)

  const startAddingNotification = (type, message) => {
    dispatch(addNotification({ id: v4(), type, message }))
  }

  const startRemovingNotification = (id) => {
    dispatch(removeNotification(id))
  }

  return {
    notifications,
    startAddingNotification,
    startRemovingNotification,
  }
}
