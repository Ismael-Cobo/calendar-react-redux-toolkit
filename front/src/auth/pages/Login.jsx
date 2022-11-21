import { Col, Container, FormControl, FormGroup, Row, Form } from 'react-bootstrap'
import { useAuthStore, useForm, useNotificationStore } from '../../hooks'
import { notificationTypes } from '../../notifaction'

import './login.css'

const loginFormData = {
  loginEmail: '',
  loginPassword: '',
}

const registerFormData = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const Login = () => {
  const { startLogin, startRegister } = useAuthStore()
  const { startAddingNotification } = useNotificationStore()

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormData)
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormData)

  const loginSubmit = (e) => {
    e.preventDefault()
    startLogin({ email: loginEmail, password: loginPassword })
  }

  const registerSubmit = (e) => {
    e.preventDefault()
    if (registerPassword !== registerPassword2) {
      startAddingNotification(notificationTypes.error, 'Las contraseñas no coinciden')
      return
    }
    startRegister({ name: registerName, email: registerEmail, password: registerPassword })
  }

  return (
    <div className='login__center'>
      <Container className='login-container'>
        <Row>
          <Col md={6} className='login-form-1'>
            <h3>Ingreso</h3>
            <Form onSubmit={loginSubmit}>
              <FormGroup className='mb-2'>
                <FormControl
                  type='text'
                  name='loginEmail'
                  value={loginEmail}
                  onChange={onLoginInputChange}
                  placeholder='Correo'
                />
              </FormGroup>
              <FormGroup className='mb-2'>
                <FormControl
                  type='password'
                  name='loginPassword'
                  value={loginPassword}
                  onChange={onLoginInputChange}
                  placeholder='Contraseña'
                />
              </FormGroup>
              <FormGroup className='mb-2'>
                <FormControl type='submit' className='btnSubmit' value='Login' />
              </FormGroup>
            </Form>
          </Col>

          <Col md={6} className='login-form-2'>
            <h3>Registro</h3>
            <Form onSubmit={registerSubmit}>
              <FormGroup className='mb-2'>
                <FormControl
                  type='text'
                  name='registerName'
                  value={registerName}
                  onChange={onRegisterInputChange}
                  placeholder='Nombre'
                />
              </FormGroup>
              <FormGroup className='mb-2'>
                <FormControl
                  type='email'
                  name='registerEmail'
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                  placeholder='Correo'
                />
              </FormGroup>
              <FormGroup className='mb-2'>
                <FormControl
                  type='password'
                  name='registerPassword'
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                  placeholder='Contraseña'
                />
              </FormGroup>

              <FormGroup className='mb-2'>
                <FormControl
                  type='password'
                  name='registerPassword2'
                  value={registerPassword2}
                  onChange={onRegisterInputChange}
                  placeholder='Repita la contraseña'
                />
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
