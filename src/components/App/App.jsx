import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import api from "../../utils/api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const navigate = useNavigate();

  const handleRegisterSubmit = ({
    email,
    password,
    name = "",
    avatar = "",
  }) => {
    return auth
      .register(email, password, name, avatar)
      .then(() => {
        closeActiveModal();
        // navigate("/profile");
        console.log("sign user in here");
        // make user login here
      })
      .catch(console.error);
  };
  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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

  const handleConfirmationClick = () => {
    setActiveModal("confirmation");
  };

  const handleCardDelete = () => {
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        fetchClothes();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ nameInput, imageUrl, weatherType }) => {
    return api
      .uploadItem({ name: nameInput, weather: weatherType, imageUrl })
      .then(() => {
        fetchClothes();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const fetchClothes = () => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
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

  // api calls on start
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    fetchClothes();
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <button onClick={handleRegisterClick}>register</button>
          <button onClick={handleLoginClick}>login</button>
          <Header
            isMobileMenuOpened={isMobileMenuOpened}
            toggleMobileMenu={toggleMobileMenu}
            handleAddClick={handleAddClick}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleCardClick={handleCardClick}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItems={clothingItems}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleConfirmationClick={handleConfirmationClick}
        />
        <ConfirmationModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          onDelete={handleCardDelete}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegisterSubmit={handleRegisterSubmit}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleLoginClick}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
