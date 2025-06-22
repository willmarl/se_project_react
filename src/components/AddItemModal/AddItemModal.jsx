import { useState, useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm, setCustomError } =
    useFormAndValidation();

  const [weatherType, setWeatherType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      nameInput: values.name,
      imageUrl: values.imageUrl,
      weatherType: values.weather,
    })
      .then(() => {
        resetForm();
        setWeatherType("");
      })
      .catch((err) => {
        console.error(err);
        setCustomError("name", "Invalid input fields");
      });
  };

  const setRadioStyle = (value) => {
    if (values.weather && values.weather !== value) {
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
      validity={isValid}
    >
      <label className={`modal__label ${errors.name ? "modal__error" : ""}`}>
        Name {errors.name && `(${errors.name})`}
        <input
          type="text"
          id="addItemName"
          name="name"
          className={`modal__input ${errors.name ? "modal__error" : ""}`}
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          required
        />
      </label>

      <label
        className={`modal__label ${errors.imageUrl ? "modal__error" : ""}`}
      >
        Image {errors.imageUrl && `(${errors.imageUrl})`}
        <input
          type="url"
          id="addItemImageUrl"
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

        <label className="modal__label" style={setRadioStyle("hot")}>
          <input
            type="radio"
            name="weather"
            id="hot"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
            required
          />
          Hot
        </label>

        <label className="modal__label" style={setRadioStyle("warm")}>
          <input
            type="radio"
            name="weather"
            id="warm"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          Warm
        </label>

        <label className="modal__label" style={setRadioStyle("cold")}>
          <input
            type="radio"
            name="weather"
            id="cold"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
