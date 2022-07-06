let buttonRedact = document.querySelector('.profile__edit');
let buttonClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let buttonSave = document.querySelector('.popup__save');

//открыть popup
function openPopup() {
    popup.classList.add('popup_active');
    userName.value = 'Жак-Ив Кусто';
    aboutMyself.value = 'Исследователь океана';
}
buttonRedact.addEventListener('click', openPopup);

//закрыть popup
function closePopup() {
    popup.classList.remove('popup_active');
}
buttonClose.addEventListener('click', closePopup);

//фуния сохранить форму

//inputы, отправ формы
const formElement = document.querySelector('.popup__fields');
const userName = document.querySelector('#user_name');
const aboutMyself = document.querySelector('#about_myself');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    //userName.value;
    //aboutMyself.value;
    let profileName = document.querySelector('.profile__name');
    let profileProf = document.querySelector('.profile__proffesion');
    profileName.textContent = userName.value;
    profileProf.textContent = aboutMyself.value;
    console.log(profileName);
}
formElement.addEventListener('submit', formSubmitHandler); 
buttonSave.addEventListener('click', formSubmitHandler);
buttonSave.addEventListener('click', closePopup);
