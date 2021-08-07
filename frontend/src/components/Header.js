import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ isLoggedIn, onLogout }) {
  const { pathname } = useLocation();
  const email = localStorage.getItem("email");

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Логотип Mesto" className="logo" />
      </Link>
      {!isLoggedIn ? (
        <Link
          to={pathname === "/signin" ? "/signup" : "/signin"}
          className="header__redirect-link"
        >
          {pathname === "/signin" ? "Регистрация" : "Войти"}
        </Link>
      ) : (
        <div className="header__group">
          <p className="header__email">{email}</p>
          <Link to="/signin" onClick={onLogout} className="header__logout">
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
