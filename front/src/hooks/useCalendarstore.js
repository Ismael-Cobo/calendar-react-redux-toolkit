import { useDispatch, useSelector } from 'react-redux'
import { onSetEventActive, onUnsetEventActive } from '../context/calendar'

export const useCalendarstore = () => {
  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector((state) => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetEventActive(calendarEvent))
  }

  const unSetActiveEvent = () => {
    dispatch(onUnsetEventActive())
  }

  return {
    events,
    activeEvent,

    setActiveEvent,
    unSetActiveEvent,
  }
}
