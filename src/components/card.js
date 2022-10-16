import { openPopup } from "./modal.js";

const popupImage = document.querySelector(".popup__figure-img");
const popupImageName = document.querySelector(".popup__figure-desc");
const popupPhotoFullSize = document.querySelector(".popup_photo");

export function createCardElement(name, link) {
  const cardElement = document.querySelector(".cards-template").content; //получаю содержимое шаблона
  const cardEl = cardElement.querySelector(".element").cloneNode(true); //клонирую
  const elPhoto = cardEl.querySelector(".element__photo");
  cardEl.querySelector(".element__title").textContent = name;
  elPhoto.alt = name; //название места
  elPhoto.src = link; //ссылка на картинку 

  //export function createCardElement(card, user) {
    //const cardElement = document.querySelector(".cards-template").content; //получаю содержимое шаблона
    //const cardEl = cardElement.querySelector(".element").cloneNode(true); //клонирую
    //const elPhoto = cardEl.querySelector(".element__photo");
    //cardEl.querySelector(".element__title").textContent = card.name;
    //elPhoto.alt = card.name; //название места
    //elPhoto.src = card.link; //ссылка на картинку






  //Лайк
  cardEl.querySelector(".element__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like_active");
  });

  //Просмотр картинки
  elPhoto.addEventListener("click", () => {
    openPopup(popupPhotoFullSize);
    //popupImage.src = card.link;
    //popupImage.alt = card.name;
    //popupImageName.textContent = card.name;
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
  });

  //Удаление
  cardEl.querySelector(".element__delete").addEventListener("click", (evt) => {
    deleteCard(card._id) //удаление карточки
        .then(() => {
          cardEl.remove();
        })
        .catch((err) => {
          console.log(err);
        });


    
  });

  return cardEl;
}
