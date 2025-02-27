import './SideBar.css'

import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function SideBar({ handleEditProfileClick }) {
  const { userData } = useContext(CurrentUserContext)

  return (
    <div className='sidebar'>
      <div className='sidebar-title'>
        <img src={userData.avatar} alt='Default Name' className='sidebar__avatar' />
        <p className='sidebar__user-name'>{userData.name}</p>
      </div>
      <div className='sidebar-content'>
        <button onClick={handleEditProfileClick}>Change profile data</button>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default SideBar
