import { Col, Container, FormControl, FormGroup, Row, Form } from 'react-bootstrap'

import './login.css'
;('martes 8 orquilla 9-14 12')

export const Login = () => {
  return (
    <div className='login__center'>
      <Container className='login-container'>
        <Row>
          <Col md={6} className='login-form-1'>
            <h3>Ingreso</h3>
            <Form>
              <FormGroup className='mb-2'>
                <FormControl type='text' placeholder='Correo' />
              </FormGroup>
              <FormGroup className='mb-2'>
                <FormControl type='password' placeholder='Contraseña' />
              </FormGroup>
              <FormGroup className='mb-2'>
                <FormControl type='submit' className='btnSubmit' value='Login' />
              </FormGroup>
            </Form>
          </Col>

          <Col md={6} className='login-form-2'>
            <h3>Registro</h3>
            <Form>
              <FormGroup className='mb-2'>
                <FormControl type='text' placeholder='Nombre' />
              </FormGroup>
              <FormGroup className='mb-2'>
                <FormControl type='email' placeholder='Correo' />
              </FormGroup>
              <FormGroup className='mb-2'>
                <FormControl type='password' placeholder='Contraseña' />
              </FormGroup>

              <FormGroup className='mb-2'>
                <FormControl type='password' placeholder='Repita la contraseña' />
              </FormGroup>

              <FormGroup className='mb-2'>
                <FormControl type='submit' className='btnSubmit' value='Crear cuenta' />
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
