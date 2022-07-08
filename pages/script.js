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

//кнопка редактировать
let buttonRedact = document.querySelector('.profile__edit');
buttonRedact.addEventListener('click', evt => { 
    userName.value = profileName.textContent;
    aboutMyself.value = profileProf.textContent;
    openPopup(popupRedact);
});

//кнопка добавить
let buttonAdd = document.querySelector('.profile__add');
buttonAdd.addEventListener('click', evt => { 
    placeName.value ="";
    placeLink.value ="";
    openPopup(popupCard);
});

//функция открыть popup
function openPopup(popup) {
  popup.classList.add('popup_active');
}

//функция закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_active');
}

//задаем переменные имя и профессия на странице
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__proffesion');

//модалки
let popupRedact = document.querySelector('.popup_red');
let popupCard = document.querySelector('.popup_card');
let popupPhoto = document.querySelector('.popup_photo');

//кнопка закрыть 
let buttonClose = document.querySelectorAll('.popup__close');
for (let i = 0; i < buttonClose.length; i++)
  buttonClose[i].addEventListener('click', evt => {closePopup(evt.target.closest(".popup"));});

//редактирование формы 
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

//вставка изначальных карточек
const cardsContainer = document.querySelector(".elements");
for (let i = 0; i < initialCards.length; i++)
    cardsContainer.appendChild(getCardElement(initialCards[i].name, initialCards[i].link));

    initLikes();

  function getCardElement(name, link) {
    let cardEl = document.createElement("article");
    cardEl.setAttribute("class", "element");
    cardEl.innerHTML = `
            <img src="" alt="" class="element__photo">
            <button class="element__delete" type="button"></button>
            <div class="element__title-like">
                <h2 class="element__title"></h2>
                <button class="element__like" type="button" aria-label="поставить нравится">
                </button>
            </div>`;

    cardEl.querySelector("img").setAttribute("src", link);
    cardEl.querySelector("img").setAttribute("alt", name);
    cardEl.querySelector("h2").textContent = name;
    return cardEl;
}

//функция лайков
function initLikes() {
    let likeButtons = document.querySelectorAll(".element__like");
    for (let i = 0; i < likeButtons.length; i++) {
        likeButtons[i].onclick = function() {
            this.classList.toggle("element__like_active");
        };
    }
}

//добавление новой картинки
const placeName = document.querySelector('#about_card');
const placeLink = document.querySelector('#link');
const popupCardForm = document.querySelector(".popup_card form");
function submitCardFormHandler(evt) {
    evt.preventDefault();
    cardsContainer.insertAdjacentElement("afterbegin", getCardElement(placeName.value, placeLink.value));
    initLikes();
}
popupCardForm.addEventListener('submit', evt => {
    submitCardFormHandler(evt);
    closePopup(popupCard);
});

//открытие картинки для просмотра
let popupImage = document.querySelector(".popup__figure-img");
let popupImageName = document.querySelector(".popup__figure-desc");
let popupPhotoFullSize = document.querySelector(".popup_photo");
let openPict = document.querySelector(".element__photo");
openPict.addEventListener('click', function(){
  openPopup(popupPhotoFullSize);
  popupImage.src = placeLink;
  popupImage.alt = placeName;
  popupImageName.textContent = placeName;
  return
});

//удаление карточки
function initLikes() {
  let deleteCard = document.querySelectorAll('.element__delete');
  for (let i = 0; i < deleteCard.length; i++) {
    deleteCard[i].onclick = function() {
      let revDiv = this.parentElement;
      revDiv.remove();
    }
  }
}







