import avatar from "../../assets/avatar.png";

import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="User's avatar" className="sidebar__avatar" />
      <div className="sidebar__user-container">
        <p className="sidebar__username">Terrance Tegene</p>
        <div className="sidebar__mobile-options">
          <button type="button" className="sidebar__mobile-option">
            Change profile data
          </button>
          <button type="button" className="sidebar__mobile-option">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
