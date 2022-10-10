import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";  
import { createCardElement } from "./card.js";
import { initialCards } from "./cardsarray.js"


//задаем переменные имя и профессия на странице
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__proffesion');

//модалки
const popupRedact = document.querySelector('.popup_red');
const popupCard = document.querySelector('.popup_card');
const popupPhoto = document.querySelector('.popup_photo');
const popupLike = document.querySelector('.element__like');

//редактирование формы 
const FormEditProfile = document.forms.edit_profile; //получили форму 
const Name = FormEditProfile.elements.name;//получили элемент формы имя
const About = FormEditProfile.elements.about

//добавление новой картинки
const FormAddCard = document.forms.add_card; //получили форму 
const NamePage = FormAddCard.elements.namepage;//получили элемент формы имя
const LinkPage = FormAddCard.elements.link


//кнопка редактировать
const buttonRedact = document.querySelector('.profile__edit');
buttonRedact.addEventListener('click', evt => { 
  Name.value = profileName.textContent;
  About.value = profileProf.textContent;
    openPopup(popupRedact);
});

//кнопка добавить
const buttonAdd = document.querySelector('.profile__add');
buttonAdd.addEventListener('click', evt => { 
    FormAddCard.reset();
    openPopup(popupCard);
    //setSubmitButtonState(false);
});

//кнопка закрыть 
const closeButtonList= document.querySelectorAll('.popup__close');
for (let i = 0; i < closeButtonList.length; i++)
closeButtonList[i].addEventListener('click', evt => { closePopup(evt.target.closest(".popup")); });

//функция редактирование формы 
function submitRedactFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = Name.value;
  profileProf.textContent = About.value;
}

//вставка изначальных карточек
const cardsContainer = document.querySelector(".elements");
for (let i = 0; i < initialCards.length; i++)
  cardsContainer.append(createCardElement(initialCards[i].name, initialCards[i].link));

//функция добавления новой картинки
function submitCardFormHandler(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCardElement(NamePage.value, LinkPage.value));
}

//слушатели кнопок
FormEditProfile.addEventListener('submit', evt => {
  submitRedactFormHandler(evt);
  closePopup(popupRedact);
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
  evt.target.reset();
});

FormAddCard.addEventListener('submit', evt => {
  submitCardFormHandler(evt);
  closePopup(popupCard);
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
  evt.target.reset();
});  

//подвключение валидации полей в модальных окнах
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__user",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__user_disabled",
  errorClass: "popup__user-error_active",
});