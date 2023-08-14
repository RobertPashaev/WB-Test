const BASE_URL = 'https://mesto.nomoreparties.co/v1/cohort-14';
const HEADERS = {
  authorization: '7d44fa7e-04ef-41d7-b07e-efc6bd06cf53',
  'Content-Type': 'application/json',
};

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.statusText}`);
  }
  return res.json();
};

export const getInitialCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    headers: HEADERS,
  }).then(handleResponse);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: HEADERS,
  }).then(handleResponse);
};

export const updateUserInfo = (obj) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: obj.name,
      about: obj.about,
    }),
    headers: HEADERS,
  }).then(handleResponse);
};

export const addNewCard = (obj) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: obj.name,
      link: obj.link,
    }),
    headers: HEADERS,
  }).then(handleResponse);
};

export const likeCard = (id) => {
  return fetch(`${BASE_URL}/cards/likes/${id}`, {
    method: 'PUT',
    headers: HEADERS,
  }).then(handleResponse);
};

export const unLikeCard = (id) => {
  return fetch(`${BASE_URL}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  }).then(handleResponse);
};

export const deleteCard = (id) => {
  return fetch(`${BASE_URL}/cards/${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  }).then(handleResponse);
};

export const updateAvatar = (avatarLink) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      ...HEADERS,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ avatar: avatarLink }),
  }).then(handleResponse);
};
