import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import calendarApi from '../api/calendarApi'
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetEventActive,
  onUnsetEventActive,
  onUpdateEvent,
  onLoadEvents,
  onLogOut,
} from '../context/calendar'
import { addNotification } from '../context/notification'
import { notificationTypes } from '../notifaction'
import { converDateEvents } from '../utils/calendar'

export const useCalendarstore = () => {
  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector((state) => state.calendar)
  const { user } = useSelector((state) => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetEventActive(calendarEvent))
  }

  const unSetActiveEvent = () => {
    dispatch(onUnsetEventActive())
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      // Hacer la petición al backend

      if (calendarEvent.id) {
        // update existing event
        const { data } = await calendarApi.put(
          '/event',
          {
            title: calendarEvent.title,
            description: calendarEvent.notes,
            start: calendarEvent.start,
            end: calendarEvent.end,
            user_id: calendarEvent.user._id,
            id: calendarEvent.id,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        )
        dispatch(onUpdateEvent(calendarEvent))
        return
      }

      //save new event

      const { data } = await calendarApi.post(
        '/event',
        {
          title: calendarEvent.title,
          description: calendarEvent.notes,
          start: calendarEvent.start,
          end: calendarEvent.end,
          user_id: calendarEvent.user._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      const { title, notes, start, end, id } = data.data
      const event = converDateEvents([{ id, title, notes, start, end, user: calendarEvent.user }])[0]
      dispatch(onAddNewEvent(event))
      dispatch(addNotification({ id: v4(), type: notificationTypes.success, message: 'El evento se ha guardado' }))
    } catch (error) {
      console.log(error)
      const { msg } = error.response.data
      dispatch(addNotification({ id: v4(), type: notificationTypes.error, message: msg }))
    }
  }

  const startDeletingEvent = async (id) => {
    try {
      // Hacer la petición al backend y verificar que exista
      const { data } = await calendarApi.delete(`/event/${id}`, {
        data: { user_id: user._id },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(onDeleteEvent({ id }))
      dispatch(addNotification({ id: v4(), type: notificationTypes.success, message: data.msg }))
    } catch (error) {
      const { msg } = error.response.data
      dispatch(addNotification({ id: v4(), type: notificationTypes.error, message: msg }))
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/event', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

      dispatch(onLoadEvents(converDateEvents(data.data)))
    } catch (error) {
      const { msg } = error.response.data
      dispatch(addNotification({ id: v4(), type: notificationTypes.error, message: msg }))
    }
  }

  const startLogingOut = () => {
    dispatch(onLogOut())
  }

  return {
    events,
    activeEvent,

    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startLogingOut,
    startSavingEvent,
    unSetActiveEvent,
  }
}
