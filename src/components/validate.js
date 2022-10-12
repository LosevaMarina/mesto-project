export function enableValidation(obj) {
  //функция добавления обшибки
  const showInputError = (formElement, element, errorMessage) => {
    const errorElement = formElement.querySelector(`.${element.id}-error`);
    element.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
    inputSelector.classList.add("popup__user_error");
  };

  //функция скрытия ошибки
  const hideInputError = (formElement, element) => {
    const errorElement = formElement.querySelector(`.${element.id}-error`);
    element.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = "";
    inputSelector.classList.remove("popup__user_error");
  };

  //функция которая проверяет валидность поля
  const isValid = (formElement, element) => {
    if (!element.validity.valid) {
      showInputError(formElement, element, element.validationMessage);
    } else {
      hideInputError(formElement, element);
    }
  };

  //поиск всех полей формы
  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(obj.inputSelector)
    );
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((element) => {
      formElement.addEventListener("reset", () => {
        setTimeout(() => {
          toggleButtonState(inputList, buttonElement);
        }, 0);
      });
      element.addEventListener("input", function () {
        isValid(formElement, element);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  //перебираем коллекцию форм
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });

  //вернет true если хотя бы одно поле невалидно
  function hasInvalidInput(inputList) {
    return inputList.some((element) => {
      return !element.validity.valid;
    });
  }
  //стилизация кнопки (активна-нет)
  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  }
}
