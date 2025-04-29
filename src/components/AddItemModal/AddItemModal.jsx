import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit }) {
  const [nameInput, setNameInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleWeatherType = (evt) => {
    setWeatherType(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ nameInput, imageUrl, weatherType });
    setNameInput("");
    setImageUrl("");
    setWeatherType("");
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="link"
          id="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
            value="hot"
            onChange={handleWeatherType}
            checked={weatherType === "hot" || false}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label">
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
        <label htmlFor="cold" className="modal__label">
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
