import "./ConfirmationModal.css";

function ConfirmationModal({ activeModal, onClose, onDelete }) {
  return (
    <div
      className={`modal ${activeModal === "confirmation" && "modal_opened"}`}
    >
      <div className="modal__content modal__content_type_confirmation">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <div className="modal__confirm-container">
          <p className="modal__confirm-text">
            Are you sure you want to delete this item?<br></br>This action is
            irreversible.
          </p>
          <button onClick={onDelete} className="modal__delete-btn">
            Yes, delete item
          </button>
          <button onClick={onClose} className="modal__cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
