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
import { Routes, Route, useNavigate } from 'react-router-dom'
import Profile from '../Profile/Profile'
import AddItemModal from '../AddItemModal/AddItemModal'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import { getItems, addItem, deleteItem } from '../../utils/api'
import AppContext from '../../contexts/AppContext'
import ProtectedRoute from '../ProtectedRoute'

import * as auth from '../../utils/auth'
import RegisterModal from '../RegisterModal/RegisterModal'
import LoginModal from '../LoginModal/LoginModal'

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
  const [userData, setUserData] = useState({ username: '', email: '' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  const handleCardClick = card => {
    setActiveModal('preview')
    setSelectedCard(card)
  }

  const handleAddClick = () => {
    setActiveModal('add-garment')
  }

  const handleLoginClick = () => {
    setActiveModal('login-modal')
  }

  const handleRegisterClick = () => {
    setActiveModal('register-modal')
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

  // const openConfirmationModal = () => {
  //   setActiveModal('delete-confirmation')
  // }

  const handleRegistration = ({ name, email, password, imageUrl }) => {
    if (password) {
      auth
        .register(name, email, password, imageUrl)
        .then(() => {
          navigate('/login')
        })
        .catch(console.error)
    }
  }

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return
    }
    auth
      .authorize(email, password)
      .then(data => {
        console.log(data);
        
        if (data.jwt) {
          setToken(data.jwt)
          setUserData(data.user)
          setIsLoggedIn(true)

          const redirectPath = location.state?.from?.pathname || '/ducks'
          navigate(redirectPath)
        }
      })
      .catch(console.error)
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
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}
          />
          <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData }}>
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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      closeActiveModal={closeActiveModal}
                      clothingItems={clothingItems}
                      onAddItem={onAddItem}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppContext.Provider>
          <Footer />

          <LoginModal
            isOpen={activeModal === 'login-modal'}
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            onLogin={handleLogin}
          />
          <RegisterModal
            isOpen={activeModal === 'register-modal'}
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            onRegister={handleRegisterClick}
          />
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
