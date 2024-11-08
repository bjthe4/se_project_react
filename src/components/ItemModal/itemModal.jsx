import "./itemModal.css";
import close from "../../assets/Union1.png";

function ItemModal({ onClose, card, handleDeleteClick, userData }) {
  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === userData._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const modalDeleteBtnClassName = `modal__delete-btn ${
    isOwn ? "modal__delete-btn_visible" : "modal__delete-btn_hidden"
  }`;
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
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button
          className="modal__delete-item-button"
          onClick={() => {
            handleDeleteClick(card);
          }}
        >
          {" "}
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
