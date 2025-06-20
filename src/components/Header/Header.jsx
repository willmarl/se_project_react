import { useContext } from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../context/CurrentUserContext";
import Avatar from "../Avatar/Avatar";

function Header({
  isMobileMenuOpened,
  toggleMobileMenu,
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleRegisterClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  function RenderAuthButtons() {
    if (isLoggedIn) {
      return (
        <div className="header__nav">
          <button
            type="button"
            onClick={handleAddClick}
            className="header__button"
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__user-container ">
            <p className="header__username">{currentUser.name}</p>
            <Avatar
              styleName={"header__avatar"}
              styleNameAlt={"header__avatar-placeholder"}
            />
          </Link>
        </div>
      );
    } else {
      return (
        <div className="header__nav">
          <button onClick={handleRegisterClick} className="header__button">
            Sign Up
          </button>
          <button onClick={handleLoginClick} className="header__button">
            Log In
          </button>
        </div>
      );
    }
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </Link>
      <button
        onClick={toggleMobileMenu}
        type="button"
        className="header__mobile-nav-btn"
      ></button>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_opened" : ""
        }`}
      >
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="header__nav__close-btn"
        ></button>
        <ToggleSwitch />
        <RenderAuthButtons />
      </div>
    </header>
  );
}

export default Header;
