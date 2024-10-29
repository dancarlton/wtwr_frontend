import './ItemModel.css'

function ItemModal({ activeModal, card, onClose, onDelete }) {
  // console.log(card)

  return (
    <div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
      <div className='modal__content_type_image'>
        <button onClick={onClose} className='modal__close_type_image'></button>
        <img src={card.imageUrl} alt={card.name} className='modal__image' />
        <div className='modal__footer'>
          <div>
          <p className='modal__name'>{card.name}</p>
          <p className='modal__weather'>Weather: {card.weather}</p>

          </div>
          <button onClick={()=>onDelete(card)} className="modal__delete">Delete item</button>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
