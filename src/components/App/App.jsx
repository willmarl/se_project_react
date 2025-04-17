import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [activeModal, setActiveModal] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
      >
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
      </ModalWithForm>
    </div>
  );
}

export default App;
