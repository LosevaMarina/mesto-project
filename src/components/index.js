import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";
import { createCardElement } from "./card.js";
import { getUserInfo, getInitialCards, changeAvatar, changeProfileInfo, postNewCard } from "./api.js"

//задаем переменные имя и профессия на странице
const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__proffesion");
//аватар
const photoAvatar = document.querySelector(".profile__image");
const avatarLink = document.getElementById("avatar_link");
const popupAvatar = document.querySelector(".popup_avatar");
//модалки
const popupRedact = document.querySelector(".popup_red");
const popupCard = document.querySelector(".popup_card");
const popupPhoto = document.querySelector(".popup_photo");
const popupLike = document.querySelector(".element__like");
const cardsContainer = document.querySelector(".elements");


//редактирование формы
const formEditProfile = document.forms.edit_profile; //получили форму
const name = formEditProfile.elements.name; //получили элемент формы имя
const about = formEditProfile.elements.about;

//добавление новой картинки
const formAddCard = document.forms.add_card; //получили форму
const namePage = formAddCard.elements.namepage; //получили элемент формы имя
const linkPage = formAddCard.elements.link;


//изменение аватара
//const avatarChangeForm = document.forms.avatar; //получили форму
//const linkAvatar = formAddCard.elements.avatar_link;

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
})

//кнопка добавить новое место
const buttonAdd = document.querySelector(".profile__add");
buttonAdd.addEventListener("click", (evt) => {
  openPopup(popupCard);
  //setSubmitButtonState(false);
});


// Отправка формы нового места
function submitNewPlaceHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  postNewCard({
    name: name.value,
    link: url.value,
  })
    .then((res) => {
      const card = createCardElement(res, userId);
      submitCardFormHandler(cardsContainer, card);
      evt.target.reset(); //очистка полей формы после отправки
      closePopup(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultButtonText);
    });
}

//кнопка закрыть
const closeButtonList = document.querySelectorAll(".popup__close");
for (let i = 0; i < closeButtonList.length; i++)
  closeButtonList[i].addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });

//функция редактирование формы, отправка формы
function submitRedactFormHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  changeProfileInfo({ name: name.value, about: about.value })
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
      renderLoading(false, submitButton, defaultButtonText);
    });
}

//вставка изначальных карточек
Promise.all([getUserInfo(), getInitialCards()])
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

//функция изменения аватара, отправка нового
function submitAvatarHandler (evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  changeAvatar(avatarLink.value)
    .then((res) => {
      photoAvatar.src = res.avatar;
      evt.target.reset();
      //closePopup(evt.target);
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultButtonText);
    });
}

//функция изменения текста кнопки при сохранении
function renderLoading(isLoading, submitButton, defaultButtonText) {
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = defaultButtonText;
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
