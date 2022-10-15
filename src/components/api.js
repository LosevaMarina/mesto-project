"use strict";
const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "470054f7-da60-4b7e-8b85-db5a83cb835c",
    "Content-Type": "application/json",
  },
};

const check = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const changeAvatar = (link) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
  //return request(`${config.baseUrl}/users/me/popupAvatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
      //popupAvatar: link,
    }),
  });
};

export const changeProfileInfo = (info) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(info),
  });
};
