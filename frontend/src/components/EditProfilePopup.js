import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isPending,
  setIsPending,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    onUpdateUser({
      name,
      about,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      btnText={isPending ? "Сохранение..." : "Сохранить"}
    >
      <label htmlFor="name" className="popup__field">
        <input
          type="text"
          placeholder="Имя"
          className="popup__input"
          id="name"
          name="name"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup__error name-error"></span>
      </label>
      <label htmlFor="about" className="popup__field">
        <input
          type="text"
          placeholder="О себе"
          className="popup__input"
          id="about"
          name="about"
          minLength="2"
          maxLength="200"
          required
          value={about || ""}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error about-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
