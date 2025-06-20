import "../Header/Header.css";
import { useState, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function Avatar({ styleName, styleNameAlt }) {
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
          className={styleName}
          onError={handleImageError}
        />
      );
    } else {
      return <div className={styleName + " " + styleNameAlt}>{initials}</div>;
    }
  }

  return RenderAvatar();
}

export default Avatar;
