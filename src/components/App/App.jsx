import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";

import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../context/CurrentUserContext";

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
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getToken, removeToken, setToken } from "../../utils/token";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    auth
      .checkToken(token)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch(console.error);
  }, []);

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

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleTokenLogin = (token) => {
    setToken(token);
    return auth.checkToken(token).then((userData) => {
      setCurrentUser(userData);
      setIsLoggedIn(true);
      closeActiveModal();
    });
  };

  const handleRegisterSubmit = ({
    email,
    password,
    name = "",
    avatar = "",
  }) => {
    return auth
      .register(email, password, name, avatar)
      .then(() => auth.login(email, password))
      .then((data) => {
        if (data.token) {
          return handleTokenLogin(data.token);
        }
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          return handleTokenLogin(data.token);
        }
      })
      .catch(console.error);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogoutClick = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "" });
    navigate("/");
  };

  const handleEditProfileSubmit = (data) => {
    return api
      .updateProfile(data)
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleCardLike = ({ _id, likes }) => {
    const isLiked = likes.some((id) => currentUser._id === id);
    if (!isLiked) {
      api
        .addCardLike(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      api
        .removeCardLike(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
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
      <CurrentUserContext.Provider
        value={{ currentUser, isLoggedIn, setCurrentUser }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              isMobileMenuOpened={isMobileMenuOpened}
              toggleMobileMenu={toggleMobileMenu}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    handleCardClick={handleCardClick}
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
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
                      handleLogoutClick={handleLogoutClick}
                      handleEditProfileClick={handleEditProfileClick}
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
            handleLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onEditProfileSubmit={handleEditProfileSubmit}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
