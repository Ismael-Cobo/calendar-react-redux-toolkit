import { Button, Container, Navbar } from 'react-bootstrap'
import { useAuthStore, useCalendarstore } from '../../hooks'

export const NavbarCalendar = () => {
  const { user, startLogOut } = useAuthStore()
  const { startLogingOut } = useCalendarstore()

  const handleClick = () => {
    startLogOut()
    startLogingOut()
  }

  return (
    <Navbar className='mb-4 px-4' bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand>
          <i className='fas fa-calendar-alt'></i>
          &nbsp; {user.name}
        </Navbar.Brand>
        <Button variant='outline-danger' onClick={handleClick}>
          <i className='fas fa-sign-out-alt'></i>
          Salir
        </Button>
      </Container>
    </Navbar>
  )
}
