class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this.deleteCard = this.deleteCard.bind(this);
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => this._getResponseData(res));
  }

  editUserInfo(userData, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: `${userData.name}`,
        about: `${userData.about}`,
      }),
    }).then((res) => this._getResponseData(res));
  }

  updateAvatar(link, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => this._getResponseData(res));
  }

  postNewCard(cardData, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: `${cardData.name}`,
        link: `${cardData.link}`,
      }),
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:5500'}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
