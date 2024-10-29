import './ModalWithForm.css'

function ModalWithForm({children, buttonText, title, onClose, onSubmit, isOpen}) {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className='modal__content'>
        <h2 className='modal__title'>{title}</h2>
        <button onClick={onClose} className='modal__close'/>
        <form  onSubmit={onSubmit} className='modal__form'>
            {children}
          <button className='modal__submit'>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm
