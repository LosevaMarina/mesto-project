
//функция открыть popup
export function openPopup(popup) {
    popup.classList.add('popup_active');
  //слушатели нажатия на Esc и мышь
    document.addEventListener ('keydown', CloseEscape);
    document.addEventListener ('click', CloseMouse);
  };
  
  //функция закрыть popup
export function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener ('keydown', CloseEscape);
    document.removeEventListener ('click', CloseMouse);
  }

  //закрытие попапа при нажатии на Esc
function CloseEscape (evt) {
    if (evt.key === "Escape") {
      const PopupActive = document.querySelector (".popup_active");
          closePopup(PopupActive);
    }
  }
  
  //закрытие попапа при нажатии на мышь 
  function CloseMouse (evt) {  
    const popup = document.querySelector('.popup_active'); 
    const composedPath = evt.composedPath();
    const clickedOutside = composedPath.includes(popup) && !composedPath.includes(popup.querySelector(".popup__container")); 
    if (clickedOutside) { 
      closePopup(popup); 
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
  