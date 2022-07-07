//кнопка добавить  
let buttonAdd = document.querySelector('.profile__add');
//кнопка сохранить
let buttonSave = document.querySelector('.popup__save');
//кнопка закрыть 
let buttonClose = document.querySelector('.popup__close');
//кнопка редактировать
let buttonRedact = document.querySelector('.profile__edit');

let popups = document.querySelectorAll('.popup');
let popupRedact = document.querySelectorAll('.popup_red');
let popupCard = document.querySelector('.popup_card');

//функция открыть popup
function openPopup(popup) {
  popup.classList.add('popup_active');
}
//вешаем событие на открытие popup
//buttonRedact.addEventListener('click', openPopup(popupRedact));
//buttonAdd.addEventListener('click', openPopup(popupCard));

buttonRedact.addEventListener('click', evt => {
  openPopup(popupRedact);
});

//функция закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_active');
}

buttonClose.addEventListener('click', closePopup(popups));








//inputы, отправ формы
const formElement = document.querySelector('.popup__fields');
const userName = document.querySelector('#user_name');
const aboutMyself = document.querySelector('#about_myself');

//фуния сохранить форму
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let profileName = document.querySelector('.profile__name');
    let profileProf = document.querySelector('.profile__proffesion');
    profileName.textContent = userName.value;
    profileProf.textContent = aboutMyself.value;
    console.log(profileName);
}
formElement.addEventListener('submit', formSubmitHandler); 
buttonSave.addEventListener('click', formSubmitHandler);
buttonSave.addEventListener('click', closePopup);


//массив с рточми, добавляются при загруз страницы
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 


