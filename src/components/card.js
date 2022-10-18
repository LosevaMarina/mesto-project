import { openPopup } from "./modal.js";
import { deleteLike, deleteNewPlace, countLikes } from "./api.js";

const popupImage = document.querySelector(".popup__figure-img");
const popupImageName = document.querySelector(".popup__figure-desc");
const popupPhotoFullSize = document.querySelector(".popup_photo");

export function createCardElement(card, userId) {
  const cardElement = document.querySelector(".cards-template").content; //получаю содержимое шаблона
  const cardEl = cardElement.querySelector(".element").cloneNode(true); //клонирую
  //cardEl.querySelector(".element__title").textContent = card.name;
  const placeTitle = cardEl.querySelector(".element__title");
  placeTitle.textContent = card.name; //название местности из поля формы
  const elPhoto = cardEl.querySelector(".element__photo");
  const buttonLike = cardEl.querySelector(".element__like");
  const buttonDelite = cardEl.querySelector(".element__delete");
  elPhoto.alt = card.name;
  elPhoto.src = card.link;
  const isUserOwner = card.owner._id === userId;
  const numberOfLikes = cardEl.querySelector(".element__like-numbers");
  numberOfLikes.textContent = card.likes.length;
  //const popupImage = document.querySelector(".popup__figure-img");
  //const popupImageName = document.querySelector(".popup__figure-desc");
  //const popupPhotoFullSize = document.querySelector(".popup_photo");
  const likeActive = "element__like_active";

  //Лайк
  if (userId) {
    const likedByUser = card.likes.some((userInfo) => {
      return userInfo._id === userId;
    });
    if (likedByUser) {
      buttonLike.classList.add(likeActive);
    }
  }

  buttonLike.addEventListener("click", function (evt) {
    if (buttonLike.classList.contains(likeActive)) {
      deleteLike(card._id) //удалить лайк если активен
        .then((res) => {
          numberOfLikes.textContent = res.likes.length;
          buttonLike.classList.remove(likeActive);
          //evt.target.classList.toggle("element__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      countLikes(card._id)
        .then((res) => {
          numberOfLikes.textContent = res.likes.length;
          buttonLike.classList.add(likeActive);
          //evt.target.classList.toggle("element__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  //Просмотр картинки
  elPhoto.addEventListener("click", () => {
    openPopup(popupPhotoFullSize);
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageName.textContent = card.name;
  });

  //Удаление картинки если она наша
  if (isUserOwner) {
    buttonDelite.addEventListener("click", () => {
      deleteNewPlace(card._id)
        .then(() => {
          const cardElParent = cardEl.closest(".element");
          cardElParent.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    buttonDelite.remove();
  }
  return cardEl;
}
