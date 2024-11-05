// App.jsx
import { useEffect, useState } from 'react'

import './App.css'
import '../../../src/vendor/fonts.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import ItemModal from '../ItemModal/ItemModal'

import { getWeather, filterWeatherData } from '../../utils/weatherAPI'
import { coordinates } from '../../utils/constants'
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext'
import { Routes, Route } from 'react-router-dom'
import Profile from '../Profile/Profile'
import AddItemModal from '../AddItemModal/AddItemModal'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import { getItems, addItem, deleteItem } from '../../utils/api'

const App = () => {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999 },
    city: '',
  })
  const [activeModal, setActiveModal] = useState('')
  const [selectedCard, setSelectedCard] = useState('')
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F')
  const [clothingItems, setClothingItems] = useState([])

  const handleCardClick = card => {
    setActiveModal('preview')
    setSelectedCard(card)
  }

  const handleAddClick = () => {
    setActiveModal('add-garment')
  }

  const closeActiveModal = () => {
    setActiveModal('')
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(prevUnit => (prevUnit === 'F' ? 'C' : 'F'))
  }

  const onAddItem = formData => {
    return addItem(formData.name, formData.imageUrl, formData.weatherType).then(
      savedItem => {
        if (savedItem) {
          setClothingItems([savedItem, ...clothingItems])
        }
      }
    )
  }

  const handleCardDelete = card => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems(clothingItems.filter(item => item._id !== card._id))
        closeActiveModal()
      })
      .catch(err => {
        console.error('Error deleting item:', err)
        alert('Could not delete item!')
      })
  }

  const openConfirmationModal = () => {
    setActiveModal('delete-confirmation')
  }

  useEffect(() => {
    // debugger
    getWeather(coordinates)
      .then(data => {
        const filteredData = filterWeatherData(data)
        setWeatherData(filteredData)
      })
      .catch(console.error)
  }, [])

  // GET Items
  useEffect(() => {
    getItems()
      .then(data => {
        // console.log(data)
        
        setClothingItems(data)
      })
      .catch(console.error)
  }, [])

  // POST Items

  return (
    <div className='page'>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className='page__content'>
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path='/'
              element={
                <Main
                  handleCardClick={handleCardClick}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <Profile
                  onCardClick={handleCardClick}
                  closeActiveModal={closeActiveModal}
                  clothingItems={clothingItems}
                  onAddItem={onAddItem}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />

          <AddItemModal
            isOpen={activeModal === 'add-garment'}
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleCardDelete}
          />
          <ConfirmationModal isOpen={activeModal === 'delete-confirmation'} />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
