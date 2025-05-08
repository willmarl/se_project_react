import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit }) {
  const [nameInput, setNameInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [validity, setValidity] = useState(false);
  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");

  const handleNameChange = (e) => {
    if (e.target.validity.valid) {
      setNameError("");
    } else {
      setNameError(`(${e.target.validationMessage})`);
    }
    setNameInput(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    if (e.target.validity.valid) {
      setImageError("");
    } else {
      setImageError(`(${e.target.validationMessage})`);
    }
    setImageUrl(e.target.value);
  };
  const handleWeatherType = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ nameInput, imageUrl, weatherType })
      .then(() => {
        setNameInput("");
        setImageUrl("");
        setWeatherType("");
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (nameInput && imageUrl && weatherType) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }, [nameInput, imageUrl, weatherType]);

  const setRadioStyle = (value) => {
    if (weatherType && weatherType !== value) {
      return { opacity: 0.5 };
    }
    return {};
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={validity}
    >
      <label
        htmlFor="name"
        className={`modal__label ${nameError ? "modal__error" : ""}`}
      >
        Name {`${nameError}`}
        <input
          type="text"
          id="name"
          className={`modal__input ${nameError ? "modal__error" : ""}`}
          placeholder="Name"
          value={nameInput}
          onChange={handleNameChange}
          minLength={2}
          maxLength={40}
          required={true}
        />
      </label>
      <label
        htmlFor="imageUrl"
        className={`modal__label ${imageError ? "modal__error" : ""}`}
      >
        Image {`${imageError}`}
        <input
          type="url"
          id="imageUrl"
          className={`modal__input ${imageError ? "modal__error" : ""}`}
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required={true}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className="modal__label"
          style={setRadioStyle("hot")}
        >
          <input
            type="radio"
            name="weather-type"
            id="hot"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherType}
            checked={weatherType === "hot" || false}
            required={true}
          />
          Hot
        </label>
        <label
          htmlFor="warm"
          className="modal__label"
          style={setRadioStyle("warm")}
        >
          <input
            type="radio"
            name="weather-type"
            id="warm"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherType}
            checked={weatherType === "warm" || false}
          />
          Warm
        </label>
        <label
          htmlFor="cold"
          className="modal__label"
          style={setRadioStyle("cold")}
        >
          <input
            type="radio"
            name="weather-type"
            id="cold"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherType}
            checked={weatherType === "cold" || false}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
