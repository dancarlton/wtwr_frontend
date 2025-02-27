import ClothesSection from '../ClothesSection/ClothesSection'
import SideBar from '../SideBar/SideBar'
import './Profile.css'

function Profile({
  onCardClick,
  clothingItems,
  onAddItem,
  handleAddClick,
  handleEditProfileClick,
  handleCardLike,
  handleLogout
}) {
  return (
    <div className='profile'>
      <section className='profile__sidebar'>
        <SideBar handleEditProfileClick={handleEditProfileClick} handleLogout={handleLogout} />
      </section>
      <section className='profile__clothes-section'>
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddItem={onAddItem}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  )
}

export default Profile
