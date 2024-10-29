import ClothesSection from '../ClothesSection/ClothesSection'
import SideBar from '../SideBar/SideBar'
import './Profile.css'

function Profile({ onCardClick, clothingItems, onAddItem, handleAddClick }) {
  return (
    <div className='profile'>
      <section className='profile__sidebar'>
        <SideBar />
      </section>
      <section className='profile__clothes-section'>
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddItem={onAddItem}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  )
}

export default Profile
