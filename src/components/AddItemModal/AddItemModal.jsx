import { useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './AddItemModal.css'

function AddItemModal({ activeModal, closeActiveModal, onAddItem, isOpen }) {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [weatherType, setWeatherType] = useState('')

  const handleNameChange = e => setName(e.target.value)
  const handleImageUrlChange = e => setImageUrl(e.target.value)
  const handleWeatherTypeChange = e => setWeatherType(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = {
      name,
      imageUrl,
      weatherType,
    }

    onAddItem(formData)

    setName('')
    setImageUrl('')
    setWeatherType('')

    closeActiveModal()
  }

  return (
    <ModalWithForm
      title='New garment'
      buttonText='Add garment'
      activeModal={activeModal}
      onClose={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
        Image{' '}
        <input
          type='text'
          className='modal__input'
          id='imageUrl'
          placeholder='Image Url'
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className='modal__radio-buttons'>
        <legend className='modal__legend'>Select the weather type:</legend>
        <label htmlFor='hot' className='modal__label modal__label_type_radio'>
          <input
            id='hot'
            type='radio'
            className='modal__radio-input'
            name='temperature'
            value='hot'
            checked={weatherType === 'hot'}
            onChange={handleWeatherTypeChange}
          />{' '}
          Hot
        </label>
        <label htmlFor='warm' className='modal__label modal__label_type_radio'>
          <input
            id='warm'
            type='radio'
            className='modal__radio-input'
            name='temperature'
            value='warm'
            checked={weatherType === 'warm'}
            onChange={handleWeatherTypeChange}
          />{' '}
          Warm
        </label>
        <label htmlFor='cold' className='modal__label modal__label_type_radio'>
          <input
            id='cold'
            type='radio'
            className='modal__radio-input'
            name='temperature'
            value='cold'
            checked={weatherType === 'cold'}
            onChange={handleWeatherTypeChange}
          />{' '}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  )
}

export default AddItemModal
