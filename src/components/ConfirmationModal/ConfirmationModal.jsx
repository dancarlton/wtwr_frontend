import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './ConfirmationModal.css'

function ConfirmationModal({isOpen}) {
  return (
    <ModalWithForm
      title='Delete Confirmation'
    >
      <p className='modal__confirmation-message'></p>
      <button type="submit" className='modal__delete'>Yes, delete item</button>
      <button type="button" className='modal__cancel'>Cancel</button>

    </ModalWithForm>

  )
}

export default ConfirmationModal
