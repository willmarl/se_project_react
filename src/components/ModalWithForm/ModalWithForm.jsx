import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <form className="modal__form">
        <h2 className="modal__title">New garment</h2>
        <button className="modal__close"></button>
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="link"
            id="imageUrl"
            className="modal__input"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label">
            <input
              type="radio"
              name="weather-type"
              id="hot"
              className="modal__radio-input"
            />{" "}
            Hot
          </label>
          <label htmlFor="warm" className="modal__label">
            <input
              type="radio"
              name="weather-type"
              id="warm"
              className="modal__radio-input"
            />{" "}
            Warm
          </label>
          <label htmlFor="cold" className="modal__label">
            <input
              type="radio"
              name="weather-type"
              id="cold"
              className="modal__radio-input"
            />{" "}
            Cold
          </label>
        </fieldset>
        <button type="submit" className="modal__submit">
          Add garment
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
