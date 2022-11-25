import React from 'react'
import { Button } from 'react-bootstrap'
import { useCalendarstore } from '../../hooks'

export const FabDeleteEvent = () => {
  const { activeEvent, startDeletingEvent } = useCalendarstore()

  const handleClick = () => {
    startDeletingEvent(activeEvent.id)
  }

  return (
    <Button variant='danger' className='fab fab__delete' onClick={() => handleClick()}>
      <i className='fas fa-trash'></i>
    </Button>
  )
}
