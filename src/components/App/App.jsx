import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // wait for modal_opened class to be added before adding event listeners
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    // if there is any active modal (it's not an empty string)
    if (activeModal) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          isMobileMenuOpened={isMobileMenuOpened}
          toggleMobileMenu={toggleMobileMenu}
          handleAddClick={handleAddClick}
          weatherData={weatherData}
        />
        <Main handleCardClick={handleCardClick} weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
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
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
