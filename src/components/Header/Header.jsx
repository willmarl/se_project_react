import { Link } from "react-router-dom";
import "../Header/Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  isMobileMenuOpened,
  toggleMobileMenu,
  handleAddClick,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="header__user-container">
            <p className="header__username">Terrance Tegene</p>
            <img src={avatar} alt="User's avatar" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
