import "./ItemCard.css";
import cardHeartDefault from "../../assets/heart-default.svg";
import cardHeartLiked from "../../assets/heart-liked.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, onCardRemoveLike }) {
  // console.log(onCardLike);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  console.log(item);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  const handleRemovelike = () => {
    onCardRemoveLike(item);
  };

  // The likes array should be an array of ids

  // are we on profile page? if so - heart icon always exist, if not - use the condition below
  const isLiked = item.likes.some((id) => id === currentUser._id);
  console.log(isLiked);

  return (
    <li className="card">
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <img
            className="card__heart"
            onClick={handleLike && handleRemovelike}
            src={isLiked ? cardHeartLiked : cardHeartDefault}
            alt="card like button"
          />
        )}
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
