import './SideBar.css'

import avatar  from '../../assets/avatar-true.svg'

function SideBar() {
  return (
    <div className='sidebar'>
      <img src={avatar} alt='Default Name' className='sidebar__avatar' />
      <p className="sidebar__user-name">Terrence Tegegne</p>
    </div>
  )
}

export default SideBar
