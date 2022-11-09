import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetEventActive, onUnsetEventActive, onUpdateEvent } from '../context/calendar'

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

      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    } catch (error) {
      console.log(error)
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

  return {
    events,
    activeEvent,

    setActiveEvent,
    unSetActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
