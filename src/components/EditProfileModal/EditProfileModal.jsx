import { useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

function EditProfileModal({
  activeModal,
  closeActiveModal,
  isOpen,
  onSaveChanges,
}) {
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleNameChange = e => setName(e.target.value)
    const handleImageUrlChange = e => setImageUrl(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const formData = {
            name,
            imageUrl
        }

        onSaveChanges(formData)
            .then(()=> {
                setName('')
                setImageUrl('')

                closeActiveModal()
            }).catch(err => {
                console.error('Error updating profile:', err)
                alert('Could not update profile!')
              })
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
      <label htmlFor='imageUrl' className='modal__label'>
        Avatar{' '}
        <input
          type='text'
          className='modal__input'
          id='imageUrl'
          placeholder='Image Url'
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </label>

    </ModalWithForm>
  )
}

export default EditProfileModal
