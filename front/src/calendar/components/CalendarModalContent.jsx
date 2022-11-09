import { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'

import { addHours, differenceInSeconds } from 'date-fns'
import es from 'date-fns/locale/es'

import { useCalendarstore, useUiStore } from '../../hooks'

import 'react-datepicker/dist/react-datepicker.css'

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

    console.log(title.length)
    if (isNaN(start)) {
      setValidations((prev) => ({ ...prev, start: true }))
      return false
    }

    if (isNaN(end)) {
      setValidations((prev) => ({ ...prev, end: true }))
      return false
    }

    if (timeDif < 0 || isNaN(timeDif)) {
      setValidations((prev) => ({ ...prev, start: true, end: true }))
      return false
    }

    setValidations((prev) => ({ ...prev, start: false, end: false }))

    if (title.length <= 0) {
      setValidations((prev) => ({ ...prev, title: true }))
      return false
    }

    setValidations((prev) => ({ ...prev, title: false }))

    return true
  }

  return (
    <>
      <h1> Nuevo evento </h1>
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
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </>
  )
}
