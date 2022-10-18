//функция открыть popup
export function openPopup(popup) {
  popup.classList.add("popup_active");
  //слушатели нажатия на Esc и мышь
  document.addEventListener("keydown", closeOnEscape);
  popup.addEventListener("mousedown", closeOnOverlay);
}

//функция закрыть popup
export function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", closeOnEscape);
  popup.removeEventListener("mousedown", closeOnOverlay);
}

//закрытие попапа при нажатии на Esc
function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_active");
    closePopup(popupActive);
  }
}

//закрытие попапа при нажатии на мышь
function closeOnOverlay(evt) {
  if (evt.target.classList.contains("popup_active")) {
    closePopup(evt.target);
  }
}
