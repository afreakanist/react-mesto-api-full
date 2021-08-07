import { useEffect } from "react";
import success from "../images/success-icon.svg";
import failure from "../images/failure-icon.svg";

function InfoTooltip({ isOpen, onClose, isSuccessful }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && isOpen) onClose();
  };

  useEffect(() => {
    const handleEscClick = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscClick);

    return () => {
      document.removeEventListener("keydown", handleEscClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <img
          src={isSuccessful ? success : failure}
          alt={isSuccessful ? "Успешная регистрация" : "Что-то пошло не так"}
          className="popup__status-img"
        />
        <h2 className="popup__status">
          {isSuccessful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
