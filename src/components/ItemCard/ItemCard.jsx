import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="card__container">
      <p className="card__title">{item.name}</p>
      <img className="card__image" src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;
