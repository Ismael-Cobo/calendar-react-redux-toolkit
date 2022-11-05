import { addHours } from 'date-fns'
import { Button } from 'react-bootstrap'
import { useCalendarstore, useUiStore } from '../../hooks'

export const FabAddNew = () => {
  const { setActiveEvent } = useCalendarstore()
  const { openDateModal } = useUiStore()

  const handleClick = () => {
    const calendarEvent = {
      title: '',
      start: new Date(),
      end: addHours(new Date(), 1),
      notes: '',
      user: {
        _id: 123,
        name: 'Ismael',
      },
    }

    setActiveEvent(calendarEvent)
    openDateModal()
  }

  return (
    <Button variant='primary' className='fab fab__addnew' onClick={() => handleClick()}>
      <i className='fas fa-plus'></i>
    </Button>
  )
}
