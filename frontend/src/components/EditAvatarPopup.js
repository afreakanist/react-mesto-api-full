import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isPending,
  setIsPending,
}) {
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    onUpdateAvatar(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <PopupWithForm
      name="avatar-update"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={isPending ? "Сохранение..." : "Сохранить"}
    >
      <label htmlFor="avatar" className="popup__field">
        <input
          ref={inputRef}
          type="url"
          placeholder="Ссылка на изображение"
          className="popup__input"
          id="avatar"
          name="avatar"
          required
        />
        <span className="popup__error avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
