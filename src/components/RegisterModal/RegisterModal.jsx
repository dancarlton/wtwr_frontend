import { useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './RegisterModal.css'

function RegisterModal({ activeModal, closeActiveModal, onRegister, isOpen, handleLoginClick }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleNameChange = e => setName(e.target.value)
  const handleEmailChange = e => setEmail(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const handleImageUrlChange = e => setImageUrl(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = {
      name,
      email,
      password,
      imageUrl,
    }

    onRegister(formData)
      .then(() => {
        setName('')
        setEmail('')
        setPassword('')

        closeActiveModal()
      })
      .catch(err => {
        console.error('Error registering user:', err)
        alert('Could not add user!')
      })
  }

  return (
    <ModalWithForm
      title='Sign Up'
      activeModal={activeModal}
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText='Sign up'
    >
      <label htmlFor='email' className='modal__label'>
        Email*{' '}
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
        Password*{' '}
        <input
          type='text'
          className='modal__input'
          id='passwrod'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor='name' className='modal__label'>
        Name*{' '}
        <input
          type='text'
          className='modal__input'
          id='name'
          placeholder='Name'
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor='imageUrl' className='modal__label'>
        Avatar URL*{' '}
        <input
          type='text'
          className='modal__input'
          id='imageUrl'
          placeholder='Avatar URL'
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </label>
      <div className='modal__secondary-button'>
        <p>or</p>
        <button className='modal__login' onClick={handleLoginClick}>Login</button>
      </div>
    </ModalWithForm>
  )
}

export default RegisterModal
