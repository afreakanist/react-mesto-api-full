import { useState } from "react";
import { withRouter } from "react-router-dom";

function Login({ onLogin }) {
  const [userData, setUserData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userData);
  };

  return (
    <div className="user-form">
      <h2 className="user-form__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);
