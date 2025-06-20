import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import Avatar from "../Avatar/Avatar";

import "./SideBar.css";

function SideBar({ handleLogoutClick, handleEditProfileClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <Avatar
          styleName={"sidebar__avatar"}
          styleNameAlt={"sidebar__avatar-placeholder"}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__options">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__option"
        >
          Change profile data
        </button>
        <button
          onClick={handleLogoutClick}
          type="button"
          className="sidebar__option"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
