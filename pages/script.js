let buttonRedact = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
function openPopup() {
    popup.classList.add(".popup_active");
}
buttonRedact.addEventListener('click', openPopup);