import { Button, Container, Navbar } from 'react-bootstrap'

export const NavbarCalendar = () => {
  return (
    <Navbar className='mb-4 px-4' bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand>
          <i className='fas fa-calendar-alt'></i>
          &nbsp; Ismael
        </Navbar.Brand>
        <Button variant='outline-danger'>
          <i className='fas fa-sign-out-alt'></i>
          Salir
        </Button>
      </Container>
    </Navbar>
  )
}
