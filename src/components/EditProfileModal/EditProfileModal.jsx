import { useContext, useEffect, useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './EditProfileModal.css'

function EditProfileModal({
  activeModal,
  closeActiveModal,
  isOpen,
  onSaveChanges,
  isLoading
}) {
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')

    const handleNameChange = e => setName(e.target.value)
    const handleAvatarChange = e => setAvatar(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const formData = {
            name,
            avatar
        }

        onSaveChanges(formData)
    }

    const { userData } = useContext(CurrentUserContext)

    useEffect(() => {
      if (isOpen && userData) {
        setName(userData.name || '')
        setAvatar(userData.avatar || '')
      }
    }, [isOpen, userData])



  return (
    <ModalWithForm
      title='Change profile data'
      activeModal={activeModal}
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Saving...' : 'Save changes'}
    >
      <label htmlFor='name' className='modal__label'>
        Name{' '}
        <input
          type='text'
          className='modal__input'
          id='name'
          placeholder='Name'
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor='avatar' className='modal__label'>
        Avatar{' '}
        <input
          type='text'
          className='modal__input'
          id='avatar'
          placeholder='Image URL'
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  )
}

export default EditProfileModal
