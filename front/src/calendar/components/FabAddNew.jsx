import { addHours } from 'date-fns'
import { Button } from 'react-bootstrap'
import { useAuthStore, useCalendarstore, useUiStore } from '../../hooks'

export const FabAddNew = () => {
  const { setActiveEvent } = useCalendarstore()
  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()

  const handleClick = () => {
    const calendarEvent = {
      title: '',
      start: new Date(),
      end: addHours(new Date(), 1),
      notes: '',
      user: {
        _id: Number(user._id),
        name: user.name,
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
