import { useContext } from 'react'
import './ItemCard.css'
import CurrentUserContext from '../../contexts/CurrentUserContext'

function ItemCard({ item, onCardClick, handleCardLike }) {
  // define isLiked : check the likes array for the current user's ID
  const { userData } = useContext(CurrentUserContext)

  const handleCardClick = () => {
    onCardClick(item)
  }

  //item.likes = [182fj18f1j82fj1f, 1jf2j19fj9182ff]

  const isLiked = item.likes.find(id => {
    return id === userData._id
  })
    ? true
    : false

  return (
    <li className='item__card'>
      <div className='item__info'>
        <h2 className='item__name'>{item.name}</h2>
        <button
          onClick={() => handleCardLike({ id: item._id, isLiked })}
          className={`item__like ${isLiked ? 'item__like_clicked' : ''}`}
        ></button>
      </div>
      <img
        onClick={handleCardClick}
        className='item__image'
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  )
}

export default ItemCard
