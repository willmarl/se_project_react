import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <form className="modal__form">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        {children}
        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
