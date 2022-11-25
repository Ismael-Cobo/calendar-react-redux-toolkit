import { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'

import { addHours, differenceInSeconds } from 'date-fns'
import es from 'date-fns/locale/es'

import { useCalendarstore, useUiStore, useNotificationStore, useAuthStore } from '../../hooks'

import 'react-datepicker/dist/react-datepicker.css'
import { notificationTypes } from '../../notifaction'
import { isSameUser } from '../../utils/calendar'

registerLocale('es', es)

const initModalContent = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 1),
}

export const CalendarModalContent = () => {
  const { activeEvent, startSavingEvent } = useCalendarstore()
  const { closeDateModal } = useUiStore()
  const { user } = useAuthStore()
  const { startAddingNotification } = useNotificationStore()

  const [formValues, setFormValues] = useState(initModalContent)

  const { title, notes, start, end } = formValues

  const [validations, setValidations] = useState({
    title: false,
    start: false,
    end: false,
  })

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent })
    }
  }, [activeEvent])

  const handleInputChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleDateChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      await startSavingEvent(formValues)
      closeDateModal()
    }
  }

  const validateForm = () => {
    const timeDif = differenceInSeconds(end, start)

    if (isNaN(start)) {
      setValidations((prev) => ({ ...prev, start: true }))
      startAddingNotification(notificationTypes.error, 'La fecha inicial no es correcta')
      return false
    }

    if (isNaN(end)) {
      setValidations((prev) => ({ ...prev, end: true }))
      startAddingNotification(notificationTypes.error, 'La fecha final no es correcta')
      return false
    }

    if (timeDif < 0 || isNaN(timeDif)) {
      setValidations((prev) => ({ ...prev, start: true, end: true }))
      startAddingNotification(notificationTypes.error, 'La final ha de ser mayor a la inicial')
      return false
    }

    setValidations((prev) => ({ ...prev, start: false, end: false }))

    if (title.length <= 0) {
      setValidations((prev) => ({ ...prev, title: true }))
      startAddingNotification(notificationTypes.error, 'El título es obligatorio')
      return false
    }

    setValidations((prev) => ({ ...prev, title: false }))

    return true
  }

  return (
    <>
      <h1> {activeEvent?.id ? 'Actualizar evento' : 'Nuevo Evento'} </h1>
      <hr />
      <form onSubmit={onSubmit} className='container'>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={start}
            onChange={(date) => handleDateChange('start', date)}
            className={`form-control ${validations.start && 'is-invalid'}`}
            locale='es'
            showTimeSelect
            dateFormat='Pp'
            timeCaption='Hora'
            disabled={isSameUser(Number(user?._id), activeEvent?.user._id)}
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={start}
            selected={end}
            onChange={(date) => handleDateChange('end', date)}
            className={`form-control ${validations.end && 'is-invalid'}`}
            locale='es'
            showTimeSelect
            dateFormat='Pp'
            timeCaption='Hora'
            disabled={isSameUser(Number(user?._id), activeEvent?.user._id)}
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${validations.title && 'is-invalid'}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={title}
            onChange={handleInputChange}
            disabled={isSameUser(Number(user?._id), activeEvent?.user._id)}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleInputChange}
            disabled={isSameUser(Number(user?._id), activeEvent?.user._id)}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button
          type='submit'
          className='btn btn-outline-primary btn-block'
          disabled={isSameUser(Number(user?._id), activeEvent?.user._id)}
        >
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </>
  )
}
