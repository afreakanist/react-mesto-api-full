import { useEffect } from "react";

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  children,
  btnText,
}) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && isOpen) onClose();
  };

  useEffect(() => {
    const handleEscClick = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name="edit"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__submit-button">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
