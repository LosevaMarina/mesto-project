import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";
import { createCardElement } from "./card.js";
import {
  aboutUser,
  initialCards,
  addAvatar,
  changeProfile,
  addNewPlace,
} from "./api.js";

//задаем переменные имя и профессия на странице
const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__proffesion");
let userId;

//аватар
const photoAvatar = document.querySelector(".profile__image");
const avatarLink = document.getElementById("avatar_link");
const popupAvatar = document.querySelector(".popup_avatar");

//модалки
const popupRedact = document.querySelector(".popup_red");
const popupCard = document.querySelector(".popup_card");
const cardsContainer = document.querySelector(".elements");

//редактирование формы
const formEditProfile = document.forms.edit_profile; //получили форму
const name = formEditProfile.elements.name; //получили элемент формы имя
const about = formEditProfile.elements.about;

//добавление новой картинки
const formAddCard = document.forms.add_card; //получили форму
const namePage = formAddCard.elements.namepage; //получили элемент формы имя
const linkPage = formAddCard.elements.link;

//кнопка редактировать
const buttonRedact = document.querySelector(".profile__edit");
buttonRedact.addEventListener("click", (evt) => {
  name.value = profileName.textContent;
  about.value = profileProf.textContent;
  openPopup(popupRedact);
});

//кнопка открыть аватар
const redactAvatar = document.querySelector(".profile__avatar");
redactAvatar.addEventListener("click", (evt) => {
  openPopup(popupAvatar);
});

//кнопка добавить новое место
const buttonAdd = document.querySelector(".profile__add");
buttonAdd.addEventListener("click", (evt) => {
  openPopup(popupCard);
});

//кнопка закрыть
const closeButtonList = document.querySelectorAll(".popup__close");
for (let i = 0; i < closeButtonList.length; i++)
  closeButtonList[i].addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });

//функция изменения аватара, отправка нового
function submitAvatarHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const textDefault = submitButton.textContent;
  renderLoading(true, submitButton);
  addAvatar(avatarLink.value)
    .then((res) => {
      photoAvatar.src = res.avatar;
      evt.target.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, textDefault);
    });
}

//функция редактирование формы, отправка формы
function submitRedactFormHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const textDefault = submitButton.textContent;
  renderLoading(true, submitButton);
  changeProfile({ name: name.value, about: about.value })
    .then((res) => {
      profileName.textContent = res.name;
      profileProf.textContent = res.about;
      evt.target.reset();
      closePopup(popupRedact);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, textDefault);
    });
}

//вставка изначальных карточек
Promise.all([aboutUser(), initialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileProf.textContent = userData.about;
    photoAvatar.src = userData.avatar;
    userId = userData._id;
    cards.reverse().forEach((item) => {
      submitCardFormHandler(cardsContainer, createCardElement(item, userId));
    });
  })
  .catch((err) => {
    console.log("тупишь, мать");
  });

  
//функция добавления новой картинки
function submitCardFormHandler(сontainer, element) {
  сontainer.prepend(element);
}

// Отправка формы нового места
function submitNewPlaceHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const textDefault = submitButton.textContent;
  renderLoading(true, submitButton);
  addNewPlace({
    name: namePage.value,
    link: linkPage.value,
  })
    .then((res) => {
      console.log("зашли");
      const card = createCardElement(res, userId);
      submitCardFormHandler(cardsContainer, card);
      evt.target.reset(); //очистка полей формы после отправки
      closePopup(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, textDefault);
    });
}

//функция изменения текста кнопки при сохранении
function renderLoading(loading, submitButton, textDefault) {
  if (loading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = textDefault;
  }
}

//слушатели кнопок
popupRedact.addEventListener("submit", submitRedactFormHandler);
popupAvatar.addEventListener("submit", submitAvatarHandler);
popupCard.addEventListener("submit", submitNewPlaceHandler);

//подвключение валидации полей в модальных окнах
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__user",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__user_disabled",
  errorClass: "popup__user-error_active",
});
