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
const popupRedactForm = document.querySelector('.popup_red form');
const Form1 = document.forms.edit_profile; //получили форму 
const Name = Form1.elements.name;//получили элемент формы имя
const About = Form1.elements.about

//добавление новой картинки
const placeName = document.querySelector('#about_card');
const placeLink = document.querySelector('#link');
const popupCardForm = document.querySelector(".popup_card form");


//кнопка редактировать
const buttonRedact = document.querySelector('.profile__edit');
buttonRedact.addEventListener('click', evt => { 
  Name.value = profileName.textContent;
  About.value = profileProf.textContent;
    //userName.value = profileName.textContent;
    //aboutMyself.value = profileProf.textContent;
    openPopup(popupRedact);
    setSubmitButtonState(true);
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
//слушатели нажатия Esc и Overlay
  document.addEventListener ('keydown', CloseEscape);
  document.addEventListener ('click', CloseMouse);
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

//закрытие попапа при нажатии на Esc
//function CloseEscape (evt) {
 // if (evt.key === "Escape") {
 //   const PopList = document.querySelectorAll (".popup");
 //   for (let i = 0; i < PopList.length; i++) {
 //     if (PopList[i].classList.contains('popup_active')) {
 //       closePopup(PopList[i]);
 //     }
 //     }
 // }
//}

//закрытие попапа при нажатии на мышь
function CloseMouse (evt) { 
  var composedPath =  evt.composedPath();
  var targetPopup = composedPath.find(x=>x.classList && x.classList.contains("popup") && x.classList.contains("popup_active"));
  if (targetPopup) {
    if (!composedPath.some(x=>x.classList && x.classList.contains("popup__container")))
      closePopup(targetPopup);
  }  
}


//закрытие попапа при нажатии на Esc
function CloseEscape (evt) {
  const PopupActive = document.querySelector (".popup_active");
  if (evt.key === "Escape") {
        closePopup(PopupActive);
      }
    }


    //вешаем слушатель input, который срабатывает при вводе или удалении каждого символа
    //проверяем что в каждом инпуте символов больше 0 и вызываем функцию setSubmitButtonState с передачей isValid, значение которого true или false
    Form1.addEventListener('input', function (evt) {
      const isValid = Name.value.length > 0 && About.value.length > 0;
      setSubmitButtonState (isValid);
    });

    function setSubmitButtonState(isFormValid) {
      const PopupSave = document.querySelector('.popup__save');
      if (isFormValid) {
        PopupSave.removeAttribute('disabled');
        PopupSave.classList.remove('popup__save_disabled'); 
      }
      else {
        PopupSave.setAttribute('disabled', true);
        PopupSave.classList.add('popup__save_disabled'); 
      }
    }


//ПРИМЕР РАБОТЫ С ФОРМАМИ
//const Form1 = document.forms.edit_profile; //получили форму 
//const Name = Form1.elements.name;//получили элемент формы имя
//const About = Form1.elements.about
// вешаем на неё обработчик события submit
Form1.addEventListener ('submit', function(evt) {
   // отменим стандартное поведение
   evt.preventDefault();
   console.log(Name); //выводим элемент формы
   //проверяем данные формы 
})