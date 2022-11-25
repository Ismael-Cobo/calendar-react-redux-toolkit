import { useState } from 'react'

import { Calendar } from 'react-big-calendar'

import { NavbarCalendar, CalendarEvent, CalendarModal, FabAddNew, FabDeleteEvent } from '../components'

import { localizer, getMessagesES, isSameUser } from '../../utils/calendar'

import { useAuthStore, useCalendarstore, useUiStore } from '../../hooks'
import { useEffect } from 'react'

import 'react-big-calendar/lib/css/react-big-calendar.css'

export const CalendarPage = () => {
  const [view, setView] = useState(localStorage.getItem('view') || 'month')
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, activeEvent, startLoadingEvents } = useCalendarstore()
  const { user } = useAuthStore()

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const onDoubleClickEvent = (props) => {
    openDateModal()
  }

  const onSelectEvent = (calendarEvent) => {
    setActiveEvent(calendarEvent)
  }

  const setCalendarPage = (props) => {
    localStorage.setItem('view', props)
    setView(props)
  }

  const eventsStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = Number(user._id) === event.user._id

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: 0,
      opacity: 0.8,
      border: 0,
      color: 'white',
    }

    return { style }
  }

  return (
    <>
      <NavbarCalendar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventsStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={setCalendarPage}
        view={view}
      />
      <CalendarModal />
      <FabAddNew />
      {!isSameUser(Number(user?._id), activeEvent?.user._id) && <FabDeleteEvent />}
    </>
  )
}
