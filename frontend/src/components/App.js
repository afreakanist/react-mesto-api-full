import "../index.css";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    caption: "",
    link: "",
  });
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccessful: false,
  });
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('jwt');
      Promise.all([api.getUserInfo(token) , api.getInitialCards(token)])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards([...cardsData]);
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogin = ({ password, email }) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("email", email);
          setIsLoggedIn(true);
          setCurrentUser((prev) => ({ ...prev, email }));
          history.push("/");
        }
        return data;
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = ({ password, email }) => {
    auth
      .register(password, email)
      .then(({_id, email}) => {
        if (_id && email) {
          setInfoTooltip({
            isOpen: true,
            isSuccessful: true,
          });
          history.push("/signin");
        } else {
          setInfoTooltip({
            isOpen: true,
            isSuccessful: false,
          });
        }
        return {_id, email};
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpen: true,
      caption: card.caption,
      link: card.link,
    });
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem('jwt');
    api
      .editUserInfo(userData, token)
      .then((newUserData) => {
        setCurrentUser((prev) => ({ ...prev, ...newUserData }));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error in profile editing: ${err}`))
      .finally(() => setIsPending(false));
  };

  const handleUpdateAvatar = (link) => {
    const token = localStorage.getItem('jwt');
    api
      .updateAvatar(link, token)
      .then(({ avatar }) => {
        setCurrentUser((prev) => ({ ...prev, avatar }));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error in avatar updating: ${err}`))
      .finally(() => setIsPending(false));
  };

  const handleAddPlaceSubmit = (cardData) => {
    const token = localStorage.getItem('jwt');
    api
      .postNewCard(cardData, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error in card posting: ${err}`))
      .finally(() => setIsPending(false));
  };

  const handleCardLike = (card) => {
    const token = localStorage.getItem('jwt');
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    const token = localStorage.getItem('jwt');
    api
      .deleteCard(card._id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      isOpen: false,
      caption: "",
      link: "",
    });
    setInfoTooltip({
      isOpen: false,
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="content">
          <Switch>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={handleLogin} />
            </Route>
            <ProtectedRoute
              path="/"
              component={Main}
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Switch>
        </main>
        <Footer />
      </div>
      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={closeAllPopups}
        isSuccessful={infoTooltip.isSuccessful}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isPending={isPending}
        setIsPending={setIsPending}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isPending={isPending}
        setIsPending={setIsPending}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isPending={isPending}
        setIsPending={setIsPending}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
