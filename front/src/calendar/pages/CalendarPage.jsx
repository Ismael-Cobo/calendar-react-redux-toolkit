import { useState } from 'react'

import { Calendar } from 'react-big-calendar'

import { NavbarCalendar, CalendarEvent, CalendarModal } from '../components'

import { localizer, getMessagesES, eventsStyleGetter } from '../../utils/calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useCalendarstore, useUiStore } from '../../hooks'

export const CalendarPage = () => {
  const [view, setView] = useState(localStorage.getItem('view') || 'month')
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarstore()

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
    </>
  )
}
