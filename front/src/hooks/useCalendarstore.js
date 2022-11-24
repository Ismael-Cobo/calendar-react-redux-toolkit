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
} from '../context/calendar'
import { addNotification } from '../context/notification'
import { notificationTypes } from '../notifaction'

export const useCalendarstore = () => {
  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector((state) => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetEventActive(calendarEvent))
  }

  const unSetActiveEvent = () => {
    dispatch(onUnsetEventActive())
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      // Hacer la petición al backend

      if (calendarEvent._id) {
        // update existing event
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
      const { title, notes, start, end } = data.data
      dispatch(onAddNewEvent({ title, notes, start, end, user: calendarEvent.user }))
      dispatch(addNotification({ id: v4(), type: notificationTypes.error, message: 'El evento se ha guardado' }))
    } catch (error) {
      const { msg } = error.response.data
      dispatch(addNotification({ id: v4(), type: notificationTypes.error, message: msg }))
    }
  }

  const startDeletingEvent = async (_id) => {
    try {
      // Hacer la petición al backend y verificar que exista
      dispatch(onDeleteEvent(_id))
    } catch (error) {
      console.log(error)
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/event', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

      dispatch(onLoadEvents(data.data))
    } catch (error) {
      const { msg } = error.response.data
      dispatch(addNotification({ id: v4(), type: notificationTypes.error, message: msg }))
    }
  }

  return {
    events,
    activeEvent,

    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
    unSetActiveEvent,
  }
}
