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
import { defaultClothingItems } from '../../utils/constants'
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
    console.log(formData)
    const newItem = {name: formData.name, link: formData.imageUrl, weather: formData.weatherType}
    setClothingItems([newItem, ...clothingItems])
  }

  const handleCardDelete = card => {
    //delete the card from the server
    //if successful, delete the card from the dom
    const updatedClothingItems = clothingItems.filter((clothingItem)=>{
      //we want this function to return true, if the card id doesn't match the clothingITem id, otherwise false
      })
      setClothingItems(updatedClothingItems)
    //close the modal
  }

  const openConfirmationModal = () => {
    //
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
                  onClardClick={handleCardClick}
                  closeActiveModal={closeActiveModal}
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
          <ConfirmationModal />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
