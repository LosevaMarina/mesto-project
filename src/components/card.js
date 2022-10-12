import { openPopup } from "./modal.js";

const popupImage = document.querySelector(".popup__figure-img");
const popupImageName = document.querySelector(".popup__figure-desc");
const popupPhotoFullSize = document.querySelector(".popup_photo");

export function createCardElement(name, link) {
  const cardElement = document.querySelector(".cards-template").content;
  const cardEl = cardElement.querySelector(".element").cloneNode(true);
  const elPhoto = cardEl.querySelector(".element__photo");
  cardEl.querySelector(".element__title").textContent = name;
  elPhoto.alt = name;
  elPhoto.src = link;

  //Лайк
  cardEl.querySelector(".element__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like_active");
  });

  //Просмотр картинки
  elPhoto.addEventListener("click", () => {
    openPopup(popupPhotoFullSize);
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
  });

  //Удаление
  cardEl.querySelector(".element__delete").addEventListener("click", (evt) => {
    cardEl.remove();
  });

  return cardEl;
}
