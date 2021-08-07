import { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Register({ onRegister }) {
  const [userData, setUserData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData);
  };

  return (
    <div className="user-form">
      <h2 className="user-form__title">Регистрация</h2>
      <form className="user-form__form" name="edit" onSubmit={handleSubmit}>
        <input
          className="user-form__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={userData.email || ""}
          onChange={handleChange}
          required
        />
        <input
          className="user-form__input"
          id="password"
          name="password"
          type="text"
          placeholder="Пароль"
          value={userData.password || ""}
          onChange={handleChange}
          required
        />
        <button type="submit" className="user-form__submit-button">
          Зарегистрироваться
        </button>
      </form>
      <p className="user-form__alt-option">
        Уже зарегистрированы?{" "}
        <Link to="sign-in" className="user-form__redirect-link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default withRouter(Register);
