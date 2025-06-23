import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  validity,
  extraButton = false,
  extraButtonText = "",
  extrabuttonOnClick,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              className={`modal__submit ${validity ? "" : "modal__disable"}`}
              disabled={!validity}
            >
              {buttonText}
            </button>
            {extraButton && (
              <button
                type="button"
                className="modal__extra-button"
                onClick={extrabuttonOnClick}
              >
                {extraButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
