import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick({ caption: card.name, link: card.link });
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `element__delete-button button ${
    isOwn ? "" : "element__delete-button_hidden"
  }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? `element__like-button_active` : ""
  }`;

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__picture"
        onClick={handleCardClick}
      />
      <button
        type="button"
        aria-label="Удалить"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__info">
        <h2 className="element__description">{card.name}</h2>
        <div className="element__like-group">
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
