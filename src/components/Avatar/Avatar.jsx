import "../Header/Header.css";
import { useState, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Avatar() {
  const { currentUser } = useContext(CurrentUserContext);
  const [validImage, setValidImage] = useState(true);

  const initials = currentUser.name[0];

  const handleImageError = () => {
    setValidImage(false);
  };

  function RenderAvatar() {
    if (validImage) {
      return (
        <img
          src={currentUser.avatar}
          alt="User's avatar"
          className="header__avatar"
          onError={handleImageError}
        />
      );
    } else {
      return (
        <div className="header__avatar header__avatar-placeholder">
          {initials}
        </div>
      );
    }
  }

  return RenderAvatar();
}

export default Avatar;
