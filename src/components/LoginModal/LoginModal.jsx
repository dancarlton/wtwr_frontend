import { useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './LoginModal.css'

function LoginModal({ activeModal, closeActiveModal, onLogin, isOpen }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = e => setEmail(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = {
      email,
      password,
    }

    onLogin(formData)
      .then(() => {
        setEmail('')
        setPassword('')

        closeActiveModal()
      })
      .catch(err => {
        console.error('Error logging in user:', err)
        alert('Could not login!')
      })
  }

  return (
    <ModalWithForm
      title='Login'
      activeModal={activeModal}
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText='Login'
    >
      <label htmlFor='email' className='modal__label'>
        Email{' '}
        <input
          type='email'
          className='modal__input'
          id='email'
          placeholder='Email'
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor='password' className='modal__label'>
        Password{' '}
        <input
          type='text'
          className='modal__input'
          id='passwrod'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  )
}

export default LoginModal
