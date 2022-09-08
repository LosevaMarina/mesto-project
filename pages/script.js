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

//задаем переменные имя и профессия на странице
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__proffesion');

//модалки
const popupRedact = document.querySelector('.popup_red');
const popupCard = document.querySelector('.popup_card');
const popupPhoto = document.querySelector('.popup_photo');
const popupImage = document.querySelector(".popup__figure-img");
const popupImageName = document.querySelector(".popup__figure-desc");
const popupPhotoFullSize = document.querySelector(".popup_photo");
const popupLike = document.querySelector('.element__like');


const cardElement = document.querySelector('.cards-template').content;

//редактирование формы 
const userName = document.querySelector('#user_name');
const aboutMyself = document.querySelector('#about_myself');
const popupRedactForm = document.querySelector('.popup_red form');
//добавление новой картинки
const placeName = document.querySelector('#about_card');
const placeLink = document.querySelector('#link');
const popupCardForm = document.querySelector(".popup_card form");

//кнопка редактировать
const buttonRedact = document.querySelector('.profile__edit');
buttonRedact.addEventListener('click', evt => { 
    userName.value = profileName.textContent;
    aboutMyself.value = profileProf.textContent;
    openPopup(popupRedact);
});

//кнопка добавить
const buttonAdd = document.querySelector('.profile__add');
buttonAdd.addEventListener('click', evt => { 
    popupCardForm.reset();
    openPopup(popupCard);
});

//функция открыть popup
function openPopup(popup) {
  popup.classList.add('popup_active');
};

//функция закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_active');
}

//кнопка закрыть 
const closeButtonList= document.querySelectorAll('.popup__close');
for (let i = 0; i < closeButtonList.length; i++)
closeButtonList[i].addEventListener('click', evt => { closePopup(evt.target.closest(".popup")); });

//функция редактирование формы 
function submitRedactFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileProf.textContent = aboutMyself.value;
}

//вставка изначальных карточек
const cardsContainer = document.querySelector(".elements");
for (let i = 0; i < initialCards.length; i++)
  cardsContainer.append(createCardElement(initialCards[i].name, initialCards[i].link));

//функция добавления новой картинки
function submitCardFormHandler(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCardElement(placeName.value, placeLink.value));
}

//слушатели кнопок
popupRedactForm.addEventListener('submit', evt => {
  submitRedactFormHandler(evt);
  closePopup(popupRedact);
});

popupCardForm.addEventListener('submit', evt => {
  submitCardFormHandler(evt);
  closePopup(popupCard);
});


function createCardElement(name, link) {
  const cardEl = cardElement.querySelector('.element').cloneNode(true);
  const elPhoto = cardEl.querySelector('.element__photo');
  cardEl.querySelector('.element__title').textContent = name;
  elPhoto.alt = name;
  elPhoto.src = link;

  //Лайк
  cardEl.querySelector(".element__like").addEventListener("click", (evt) => {
    //if (evt.target.classList.contains('element__like')) {
    evt.target.classList.toggle("element__like_active");
  })

  //Просмотр картинки
  elPhoto.addEventListener("click", (evt) => {
    const pic = evt.target;
    openPopup(popupPhotoFullSize);
    popupImage.src = pic.getAttribute("src");
    popupImage.alt = pic.getAttribute("alt");
    popupImageName.textContent = pic.alt;
  })

  //Удаление
  cardEl.querySelector('.element__delete').addEventListener("click", (evt) => {
    const revDiv = evt.target.closest(".element");
      revDiv.remove();
  })

  return cardEl;
}




const closeEsc= document.querySelectorAll('.popup');
for (let i = 0; i < closeEsc.length; i++)
closeEsc[i].addEventListener('keydown', evt => { 
  if (evt.key === "Escape") {
    evt.preventDefault();
    closePopup(evt.target.closest(".popup"));
    console.log ("закрываем попап при нажатии на Enter!")}
   });