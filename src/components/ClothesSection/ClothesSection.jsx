import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="clothes-section__text">Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__add-btn">
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {[...clothingItems].reverse().map((item) => {
          if (item.owner === currentUser._id) {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardLike={onCardLike}
                onCardClick={handleCardClick}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
