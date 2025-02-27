import './SideBar.css'

import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function SideBar({ handleEditProfileClick, handleLogout }) {
  const { userData } = useContext(CurrentUserContext)

  return (
    <div className='sidebar'>
      <div className='sidebar-title'>
        <img
          src={userData.avatar}
          alt={userData.name}
          className='sidebar__avatar'
        />
        <p className='sidebar__user-name'>{userData.name}</p>
      </div>
      <div className='sidebar-content'>
        <button onClick={handleEditProfileClick}>Change profile data</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default SideBar
