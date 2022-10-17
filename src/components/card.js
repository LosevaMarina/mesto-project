import { openPopup } from "./modal.js";
import { deleteLike, deleteCard, setLike } from "./api.js";

//const popupImage = document.querySelector(".popup__figure-img");
//const popupImageName = document.querySelector(".popup__figure-desc");
//const popupPhotoFullSize = document.querySelector(".popup_photo");

  export function createCardElement(card, user) {
    const cardElement = document.querySelector(".cards-template").content; //получаю содержимое шаблона
    const cardEl = cardElement.querySelector(".element").cloneNode(true); //клонирую
    const elPhoto = cardEl.querySelector(".element__photo");
    cardEl.querySelector(".element__title").textContent = card.name;
    const buttonLike = cardEl.querySelector(".element__like");
    const buttonDelite = cardEl.querySelector(".element__delete");
    elPhoto.alt = card.name;
    elPhoto.src = card.link;
    const isUserOwner = card.owner._id === user;
    const numberOfLikes = placeElement.querySelector(".element__like-numbers");
    numberOfLikes.textContent = card.likes.length;
    const popupImage = document.querySelector(".popup__figure-img");
    const popupImageName = document.querySelector(".popup__figure-desc");
    const popupPhotoFullSize = document.querySelector(".popup_photo");

  //Лайк
  if (user) {
    const likedByUser = card.likes.some((userInfo) => {
      return userInfo._id === user;
    });
    if (likedByUser) {
      buttonLike.classList.add(".element__like_active");
    }
  }
  buttonLike.addEventListener("click", function (evt) {
    // на элемент вешается событие
    if (buttonLike.classList.contains(".element__like_active")) {
      //Если лайк уже активен - удаляю лайк
      deleteLike(card._id)
        .then((res) => {
          numberOfLikes.textContent = res.likes.length;
          buttonLike.classList.remove(".element__like_active");
          //evt.target.classList.toggle("element__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLike(card._id)
        .then((res) => {
          numberOfLikes.textContent = res.likes.length;
          buttonLike.classList.add(".element__like_active");
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


  //Удаление
  if (isUserOwner) {
    buttonDelite.addEventListener("click", (evt) => {
    deleteCard(card._id)
        .then(() => {
          const cardElParent = cardEl.cardEl(".element"); 
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
