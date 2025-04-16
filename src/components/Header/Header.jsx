import "../Header/Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date-location">June 15, New York</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrance Tegene</p>
        <img src={avatar} alt="User's avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
