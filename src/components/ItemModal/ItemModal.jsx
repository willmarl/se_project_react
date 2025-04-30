import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleConfirmationClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_type_preview">
        <button
          onClick={onClose}
          type="button"
          className="modal__close_type_preview"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">
            {card.name}{" "}
            <button
              onClick={handleConfirmationClick}
              className="modal__delete-btn"
            >
              Delete Item
            </button>
          </h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
