//массив с карточки. добавляется при загрузке страницы
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

//кнопка сохранить
let buttonSave = document.querySelector('.popup__save');


let popups = document.querySelectorAll('.popup');



let buttonAdd = document.querySelector('.profile__add');//кнопка добавить
buttonAdd.addEventListener('click', evt => { 
    placeName.value ="";
    placeLink.value ="";
    openPopup(popupCard);
});
let buttonRedact = document.querySelector('.profile__edit');//кнопка редактировать
buttonRedact.addEventListener('click', evt => { 
    userName.value = profileName.textContent;
    aboutMyself.value = profileProf.textContent;
    openPopup(popupRedact);
});

//задаем переменные имя и профессия на странице
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__proffesion');

//модалки
let popupRedact = document.querySelector('.popup_red');
let popupCard = document.querySelector('.popup_card');
let buttonClose = document.querySelector('.popup__close');//кнопка закрыть 
for (i = 0; i < buttonClose.length; i++)
buttonClose[i].addEventListener('click', evt => {closePopup(evt.target.closest('.popup'));});

//редактирование
const userName = document.querySelector('#user_name');
const aboutMyself = document.querySelector('#about_myself');
const popupRedactForm = document.querySelector('.popup_red form');
function submitRedactFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileProf.textContent = aboutMyself.value;
    console.log(profileName);
}
popupRedactForm.addEventListener('submit', evt => {
    submitRedactFormHandler(evt);
    closePopup(popupRedact); 
});

//функция открыть popup
function openPopup(popup) {
  popup.classList.add('popup_active');
}

//функция закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_active');
}

//вставка изначальных карточек
const cardsContainer = document.querySelector('.elements');
for(i = 0; i < initialCards.length; i++)
  cardsContainer.appendChild(getCardElement(initialCards[i].name, initialCards[i].link));
  
  initLinks();




buttonClose.addEventListener('click', evt => {
  openPopup(popupCard);
});

//buttonClose.addEventListener('click', closePopup(popups));






