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
import {
  getItems,
  addItem,
  deleteItem,
  editProfile,
  addCardLike,
  removeCardLike,
} from '../../utils/api'

import ProtectedRoute from '../ProtectedRoute'

import * as auth from '../../utils/auth'
import RegisterModal from '../RegisterModal/RegisterModal'
import LoginModal from '../LoginModal/LoginModal'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import EditProfileModal from '../EditProfileModal/EditProfileModal'

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
  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: '',
    avatar: '',
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  const handleCardClick = card => {
    // console.log(card)
    if (!card || Object.keys(card).length === 0) {
      console.warn('handleCardClick: No valid card provided!', card)
      return
    }
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

  const handleEditProfileClick = () => {
    setActiveModal('edit-profile')
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
        setClothingItems([savedItem, ...clothingItems])
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

  const handleRegistration = ({ name, email, password, imageUrl }) => {
    if (password) {
      return auth.register(name, email, password, imageUrl).then(() => {
        return handleLogin({ email, password })
      })
    }
  }

  const handleProfileEdit = ({ name, avatar }) => {
    editProfile(name, avatar)
      .then(data => {
        setUserData(data)

        closeActiveModal()
      })
      .catch(err => {
        console.error('Error updating profile data:', err)
        alert('Could not update profile!')
      })
  }

  const storeToken = token => {
    localStorage.setItem('jwt', token)
  }

  const removeToken = token => {
    localStorage.removeItem('jwt', token)
  }

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return
    }
    return auth.authorize(email, password).then(data => {
      console.log(data)
      storeToken(data.token)
      setUserData(data.user)
      setIsLoggedIn(true)

      navigate('/profile')
    })
  }

  const handleLogout = () => {
    removeToken()
    setUserData({
      _id: '',
      name: '',
      email: '',
      avatar: '',
    })
    setIsLoggedIn(false)

    navigate('/')
  }

  const handleCardLike = ({ id, isLiked }) => {
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id)
          .then(updatedCard => {
            setClothingItems(cards =>
              cards.map(item => (item._id === id ? updatedCard : item))
            )
          })
          .catch(err => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id)
          .then(updatedCard => {
            setClothingItems(cards =>
              cards.map(item => (item._id === id ? updatedCard : item))
            )
          })
          .catch(err => console.log(err))
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

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      auth
        .checkToken(token)
        .then(data => {
          setUserData(data)
          setIsLoggedIn(true)
        })
        .catch(err => {
          console.error('Error verifying token:', err)
          localStorage.removeItem('jwt')
          setIsLoggedIn(false)
        })
    }
  }, [])

  // GET Items
  useEffect(() => {
    getItems()
      .then(data => {
        setClothingItems(data)
      })
      .catch(console.error)
  }, [])

  return (
    <CurrentUserContext.Provider value={{ userData, isLoggedIn }}>
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

            <Routes>
              <Route
                path='/'
                element={
                  <Main
                    handleCardClick={handleCardClick}
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
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
                      handleEditProfileClick={handleEditProfileClick}
                      handleCardLike={handleCardLike}
                      handleLogout={handleLogout}
                      isLoggedIn={isLoggedIn}

                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />

            <RegisterModal
              isOpen={activeModal === 'register-modal'}
              closeActiveModal={closeActiveModal}
              activeModal={activeModal}
              onRegister={handleRegistration}
              handleLoginClick={handleLoginClick}
            />
            <LoginModal
              isOpen={activeModal === 'login-modal'}
              closeActiveModal={closeActiveModal}
              activeModal={activeModal}
              onLogin={handleLogin}
              handleRegisterClick={handleRegisterClick}
            />
            <AddItemModal
              isOpen={activeModal === 'add-garment'}
              closeActiveModal={closeActiveModal}
              activeModal={activeModal}
              onAddItem={onAddItem}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard || {}}
              onClose={closeActiveModal}
              onDelete={handleCardDelete}

            />
            <EditProfileModal
              isOpen={activeModal === 'edit-profile'}
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              onSaveChanges={handleProfileEdit}
            />

            <ConfirmationModal isOpen={activeModal === 'delete-confirmation'} />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
