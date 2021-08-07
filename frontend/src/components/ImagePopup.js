function ImagePopup({ card, onClose }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className={`popup popup_picture ${card.isOpen ? "popup_opened" : null}`}
      onClick={handleOverlayClick}
    >
      <figure className="popup__figure">
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt="Картинка" className="popup__picture" />
        <figcaption className="popup__picture-caption">
          {card.caption}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
