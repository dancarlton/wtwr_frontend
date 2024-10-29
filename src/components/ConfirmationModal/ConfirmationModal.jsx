import './ConfirmationModal.css'

function ConfirmationModal() {
  return (
    <div className='modal'>
      <button className='modal__close'>X</button>
      <p className='modal__confirmation-message'></p>
      <button className='modal__delete'>Yes, delete item</button>
      <button className='modal__cancel'>Cancel</button>
    </div>
  )
}

export default ConfirmationModal
