import './Header.css'
import logo from '/src/assets/logo.svg'
import avatar from '/src/assets/avatar-true.svg'

function Header() {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className='header'>
        
      <img
        src={logo}
        alt='WTWR Logo'
        className='header__logo'
      />
      <p className='header__date'>
        {currentDate.month} {currentDate.day} date / location
      </p>
      <button className='header__add-clothes-button'>+ Add clothes</button>
      <div className='header__user-container'>
        <p className='header__username'>Terrence Tegegne</p>
        <img
          src={avatar}
          alt='Terrence Tegegne'
          className='header__avatar'
        />
      </div>
    </div>
  )
}

export default Header
