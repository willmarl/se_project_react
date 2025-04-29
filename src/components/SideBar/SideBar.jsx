import avatar from "../../assets/avatar.png";

import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="User's avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Terrance Tegene</p>
    </div>
  );
}

export default SideBar;
