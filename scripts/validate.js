const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// Функция включения валидации
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      setEventListeners(formElement, validationSettings);
    });
};

// Функция добавления слушателей к элементу формы
const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationSettings);
        toggleButtonState(inputList, buttonElement, validationSettings);
      });
    });
};

// Функция проверки валидности
const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
      hideInputError(formElement, inputElement, validationSettings);
    }
};

// Функция отображения ошибки
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};
  
// Функция сокрытия ошибки
const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};

// Функция поиска невалидности формы
const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
}

// Функция переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
}
  
enableValidation(validationSettings);