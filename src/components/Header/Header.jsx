import './Header.css'
import logo from '/src/assets/logo.svg'
import avatar from '/src/assets/avatar-true.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { Link } from 'react-router-dom'

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to='/'>
          <img src={logo} alt='WTWR Logo' className='header__logo' />
        </Link>
      </div>
      <p className='header__date'>
        {currentDate} / {weatherData.city}
      </p>
      <div className='header__toggle-switch'>
        <ToggleSwitch />
      </div>
      <button
        onClick={handleAddClick}
        type='button'
        className='header__add-clothes-button'
      >
        + Add clothes
      </button>
      <div className='header__user-container'>
        <p className='header__username'>Terrence Tegegne</p>
        <Link to='/profile'>
          <img src={avatar} alt='Terrence Tegegne' className='header__avatar' />
        </Link>
      </div>
    </header>
  )
}

export default Header
