import { useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

function EditProfileModal({
  activeModal,
  closeActiveModal,
  isOpen,
  onSaveChanges,
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


  return (
    <ModalWithForm
      title='Change profile data'
      activeModal={activeModal}
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText='Save changes'
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
          placeholder='Image Url'
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  )
}

export default EditProfileModal
