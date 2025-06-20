import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    onCardLike(item);
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card__container">
      <div className="card__title">
        <p className="card__name">{item.name}</p>
        {isLoggedIn ? (
          <button
            onClick={handleLike}
            className={`card__like-btn${
              isLiked ? " card__like-btn_liked" : ""
            }`}
          ></button>
        ) : null}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
