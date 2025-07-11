import SideBar from "../Sidebar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  handleLogoutClick,
  handleEditProfileClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogoutClick={handleLogoutClick}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
