import { useState, useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const [weatherType, setWeatherType] = useState("");

  const handleWeatherType = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      nameInput: values.name,
      imageUrl: values.imageUrl,
      weatherType,
    })
      .then(() => {
        resetForm();
        setWeatherType("");
      })
      .catch(console.error);
  };

  const setRadioStyle = (value) => {
    if (weatherType && weatherType !== value) {
      return { opacity: 0.5 };
    }
    return {};
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? "Adding..." : "Add garment"}
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={
        (isValid && weatherType !== "") ||
        isLoading ||
        (isValid && weatherType !== "")
      }
    >
      <label
        htmlFor="name"
        className={`modal__label ${errors.name ? "modal__error" : ""}`}
      >
        Name {errors.name && `(${errors.name})`}
        <input
          type="text"
          id="name"
          name="name"
          className={`modal__input ${errors.name ? "modal__error" : ""}`}
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          minLength={2}
          maxLength={40}
          required
        />
      </label>

      <label
        htmlFor="imageUrl"
        className={`modal__label ${errors.imageUrl ? "modal__error" : ""}`}
      >
        Image {errors.imageUrl && `(${errors.imageUrl})`}
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          className={`modal__input ${errors.imageUrl ? "modal__error" : ""}`}
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
          required
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
            name="weather"
            id="hot"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherType}
            checked={weatherType === "hot"}
            required
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
            name="weather"
            id="warm"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherType}
            checked={weatherType === "warm"}
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
            name="weather"
            id="cold"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherType}
            checked={weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
