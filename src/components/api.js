/*const config = {
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
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  });
};

export const deleteCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const likesCounter = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const deleteLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};
*/