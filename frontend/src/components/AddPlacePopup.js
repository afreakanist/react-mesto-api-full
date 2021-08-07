import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isPending,
  setIsPending,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleCaptionChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    onAddPlace({
      name,
      link,
    });

    setName("");
    setLink("");
  };

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={isPending ? "Сохранение..." : "Создать"}
    >
      <label htmlFor="caption" className="popup__field">
        <input
          type="text"
          placeholder="Название"
          className="popup__input"
          id="caption"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleCaptionChange}
        />
        <span className="popup__error caption-error"></span>
      </label>
      <label htmlFor="link" className="popup__field">
        <input
          type="url"
          placeholder="Ссылка на изображение"
          className="popup__input"
          id="link"
          name="link"
          required
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
