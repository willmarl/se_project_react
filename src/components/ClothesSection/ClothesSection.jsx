import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ handleCardClick, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__title">
        <p className="clothes-section__text">Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__add-btn">
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
