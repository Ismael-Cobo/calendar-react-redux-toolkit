import Modal from 'react-modal'

import { CalendarModalContent } from './CalendarModalContent'

import { useCalendarstore, useUiStore } from '../../hooks'

import { customStyles } from '../../utils/modal'

Modal.setAppElement('#root')

export const CalendarModal = () => {
  const { closeDateModal, isDateModalOpen } = useUiStore()
  const { unSetActiveEvent } = useCalendarstore()

  const onCloseModal = () => {
    closeDateModal()
    unSetActiveEvent()
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
    >
      <CalendarModalContent />
    </Modal>
  )
}
