import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './WakingUpModal.css'
import spinner from '../../assets/fingers-loading.json'
import Lottie from 'lottie-react'

function WakingUpModal({ isOpen, onClose }) {
  return (
    <ModalWithForm
      activeModal="waking-up"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Close"
    >
      <div className="modal__content">
        <Lottie animationData={spinner} />
        <p>☁️ The WTWR servers are waking up…</p>
        <p>Please wait a few moments while we get things ready.</p>
      </div>
    </ModalWithForm>
  )
}

export default WakingUpModal
