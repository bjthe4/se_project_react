import "./itemModal.css";
import close from "../../assets/Union1.png";

function ItemModal({ onClose, card, handleDeleteClick }) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_close"
        >
          <img src={close} alt="Close" />
        </button>
        <img
          src={card.imageUrl}
          alt={`Image of ${card.name}`}
          className="modal__image"
        />
        <div className="modal__footer">
          <button
            className="modal__delete-item-button"
            onClick={() => {
              handleDeleteClick(card);
            }}
          >
            {" "}
            Delete button
          </button>
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
