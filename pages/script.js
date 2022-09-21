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
//const userName = document.querySelector('#user_name');
//const aboutMyself = document.querySelector('#about_myself');
//const popupRedactForm = document.querySelector('.popup_red form');
const FormEditProfile = document.forms.edit_profile; //получили форму 
const Name = FormEditProfile.elements.name;//получили элемент формы имя
const About = FormEditProfile.elements.about

//добавление новой картинки
//const placeName = document.querySelector('#about_card');
//const placeLink = document.querySelector('#link');
//const popupCardForm = document.querySelector(".popup_card form");
const FormAddCard = document.forms.add_card; //получили форму 
const NamePage = FormAddCard.elements.namepage;//получили элемент формы имя
const LinkPage = FormAddCard.elements.link


//кнопка редактировать
const buttonRedact = document.querySelector('.profile__edit');
buttonRedact.addEventListener('click', evt => { 
  Name.value = profileName.textContent;
  About.value = profileProf.textContent;
    //userName.value = profileName.textContent;
    //aboutMyself.value = profileProf.textContent;
    openPopup(popupRedact);
    //setSubmitButtonState(true);
});

//кнопка добавить
const buttonAdd = document.querySelector('.profile__add');
buttonAdd.addEventListener('click', evt => { 
    FormAddCard.reset();
    openPopup(popupCard);
    //setSubmitButtonState(false);
});

//функция открыть popup
function openPopup(popup) {
  popup.classList.add('popup_active');
//слушатели нажатия на Esc и мышь
  document.addEventListener ('keydown', CloseEscape);
  document.addEventListener ('click', CloseMouse);
};

//функция закрыть popup
function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener ('keydown', CloseEscape);
  //document.removeEventListener ('click', CloseMouse);
}

//кнопка закрыть 
const closeButtonList= document.querySelectorAll('.popup__close');
for (let i = 0; i < closeButtonList.length; i++)
closeButtonList[i].addEventListener('click', evt => { closePopup(evt.target.closest(".popup")); });

//функция редактирование формы 
function submitRedactFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = Name.value;
  profileProf.textContent = About.value;
  //profileName.textContent = userName.value;
  //profileProf.textContent = aboutMyself.value;
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
});

FormAddCard.addEventListener('submit', evt => {
  submitCardFormHandler(evt);
  closePopup(popupCard);
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
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

//закрытие попапа при нажатии на Esc
function CloseEscape (evt) {
  if (evt.key === "Escape") {
    const PopupActive = document.querySelector (".popup_active");
        closePopup(PopupActive);
        console.log('не нажимай!')
  }
}

//закрытие попапа при нажатии на мышь 
function CloseMouse (evt) {  
  const popup = document.querySelector('.popup_active'); 
  const composedPath = evt.composedPath();
  const clickedOutside = composedPath.includes(popup) && !composedPath.includes(popup.querySelector(".popup__container")); 
  if (clickedOutside) { 
    closePopup(popup); 
    console.log('не трогай мышь!')
  } 
}

//закрытие попапа при нажатии на мышь
//function CloseMouse (evt) { 
//  const composedPath =  evt.composedPath();
//  const targetPopup = composedPath.find(x=>x.classList && x.classList.contains("popup") && x.classList.contains("popup_active"));
//  if (targetPopup) {
//    if (!composedPath.some(x=>x.classList && x.classList.contains("popup__container")))
//      closePopup(targetPopup);
//  }  
//}

//закрытие попапа при нажатии на Esc
//function CloseEscape (evt) {
  //if (evt.key === "Escape") {
    //const PopList = document.querySelector (".popup_active");
    //const PopList = document.querySelectorAll (".popup");
    //for (let i = 0; i < PopList.length; i++) {
      //if (PopList[i].classList.contains('popup_active')) {
        //closePopup(PopList);
        //console.log('не нажимай!')
      //}
      //}
  //}
//}


const PopupInput = document.querySelector ('.popup__user');
const PopupForm = document.querySelector ('.popup__form');
const formError = document.querySelector(`.${PopupInput.id}-error`);
// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, element, errorMessage) => {
  const elementError = document.querySelector(`.${element.id}-error`);
  element.classList.add('popup__user_disabled');
  //покажем сообщение об ошибке
  elementError.classList.add('popup__user-error_active');
  elementError.textContent=errorMessage;
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, element) => {
  const elementError = document.querySelector(`.${element.id}-error`);
  element.classList.remove('popup__user_disabled');
  //скроем сообщение об ошибке
  elementError.classList.remove('popup__user-error_active');
  elementError.textContent="";
};
// Функция, которая проверяет валидность поля
const isValid = (formElement, element) => {
  if (!element.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, element, element.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, element);
  }
};
//отмена стандартного поведения по сабмиту
PopupForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
//слушатель ввода символов, при котором вызывается функция проверки на валидность
PopupInput.addEventListener('input', function () {
  isValid(PopupForm, PopupInput);
});
//перебор всех инпутов формы
const setEventListeners = (formElement) => {
  const inputList=Array.from (formElement.querySelectorAll('.popup__user'));
  inputList.forEach((element) => {
    element.addEventListener('input', function () {
      isValid(formElement, element);
    });
  })
}
//перебор всех форм
const enableValidation = () => {
  const formList=Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
    setEventListeners (formElement);
});
};
enableValidation (PopupForm, PopupInput, formError);