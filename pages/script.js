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
const buttonRedact = document.querySelector('.profile__edit');
buttonRedact.addEventListener('click', evt => { 
    userName.value = profileName.textContent;
    aboutMyself.value = profileProf.textContent;
    openPopup(popupRedact);
});

//кнопка добавить
const buttonAdd = document.querySelector('.profile__add');
buttonAdd.addEventListener('click', evt => { 
    //placeName.value ="";
    //placeLink.value ="";
    document.addEventListener('submit', (placeName) => { 
      placeName.target.reset(); 
    });
    document.addEventListener('submit', (placeLink) => { 
      placeLink.target.reset(); 
    });
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
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__proffesion');

//модалки
const popupRedact = document.querySelector('.popup_red');
const popupCard = document.querySelector('.popup_card');
const popupPhoto = document.querySelector('.popup_photo');
const popupImage = document.querySelector(".popup__figure-img");
const popupImageName = document.querySelector(".popup__figure-desc");
const popupPhotoFullSize = document.querySelector(".popup_photo");

//кнопка закрыть 
const closeButtonList= document.querySelectorAll('.popup__close');
for (let i = 0; i < closeButtonList.length; i++)
closeButtonList[i].addEventListener('click', evt => { closePopup(evt.target.closest(".popup")); });

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
  cardsContainer.append(createCardElement(initialCards[i].name, initialCards[i].link));

//добавление новой картинки
const placeName = document.querySelector('#about_card');
const placeLink = document.querySelector('#link');
const popupCardForm = document.querySelector(".popup_card form");
function submitCardFormHandler(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCardElement(placeName.value, placeLink.value));
 
}
popupCardForm.addEventListener('submit', evt => {
  submitCardFormHandler(evt);
  closePopup(popupCard);
});

function createCardElement(name, link) {
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

  //Лайк
  cardEl.querySelector(".element__like").onclick = (evt) => {
    evt.target.classList.toggle("element__like_active");
  }

  //Просмотр картинки
  cardEl.querySelector(".element__photo").onclick = (evt) => {
    const pic = evt.target;
    openPopup(popupPhotoFullSize);
    popupImage.src = pic.getAttribute("src");
    popupImage.alt = pic.getAttribute("alt");
    popupImageName.textContent = pic.parentNode.querySelector("h2").textContent;
  }

  //Удаление
  cardEl.querySelector('.element__delete').onclick = (evt) => {
    const revDiv = evt.target.closest(".element");
      revDiv.remove();
  }

  return cardEl;
}