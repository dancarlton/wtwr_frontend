import './Header.css'
import logo from '/src/assets/logo.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
}) {
  const { userData } = useContext(CurrentUserContext)

  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to='/wtwr_frontend'>
          <img src={logo} alt='WTWR Logo' className='header__logo' />
        </Link>
      </div>
      <p className='header__date'>
        {currentDate} / {weatherData.city}
      </p>
      <div className='header__toggle-switch'>
        <ToggleSwitch />
      </div>
      {!isLoggedIn ? (
        <div>
          <button className='register-button' onClick={handleRegisterClick}>Sign Up</button>
          <button className='login-button' onClick={handleLoginClick}>Login</button>
        </div>
      ) : (
        <div className='header'>
          <button
            onClick={handleAddClick}
            type='button'
            className='header__add-clothes-button'
          >
            + Add clothes
          </button>
          <div className='header__user-container'>
            <p className='header__username'>{userData.name}</p>
            <Link to='/profile'>
              <img
                src={userData.avatar}
                alt={userData.name}
                className='header__avatar'
              />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
