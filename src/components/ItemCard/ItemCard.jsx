import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  // The likes array should be an array of ids
  const likes = {};
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const cardHeartClassName = `card__heart ${
    isLiked ? "card__heart_visible" : "card__heart_hidden"
  }`;
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className={cardHeartClassName}
        onClick={handleLike}
        src={cardHeart}
        alt="card like button"
      />
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
