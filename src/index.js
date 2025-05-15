import './pages/index.css'; // импорт главного файла стилей
import { initialCards, createCard } from './components/cards.js';
import './components/validate.js';
import {openModal, closeModal} from './components/modal.js';

// DOM-узлы
const cardsList = document.querySelector(".places__list");                      // Контейнер для карточек

const profileEditPopup = document.querySelector(".popup_type_edit");            // Поп-ап редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");      // Кнопка редактирования
const profileName = document.querySelector(".profile__title");                  // Имя в профиле
const profileJob = document.querySelector(".profile__description");             // Занятие в профиле
const nameInput = document.querySelector(".popup__input_type_name");            // Поле ввода имени
const jobInput = document.querySelector(".popup__input_type_description");      // Поле ввода занятия

const cardAddPopup = document.querySelector(".popup_type_new-card");            // Поп-ап добавления карточки
const cardAddButton = document.querySelector(".profile__add-button");           // Кнопка добавления карточки
const cardNameInput = document.querySelector(".popup__input_type_card-name");   // Поле ввода названия карточки
const cardLinkInput = document.querySelector(".popup__input_type_url");         // Поле ввода ссылки на картинку


// Поп-ап редактирования профиля
profileEditButton.addEventListener("click", function(){                               
    nameInput.placeholder = profileName.textContent;    
    jobInput.placeholder = profileJob.textContent;

    openModal(profileEditPopup);
})

function handleProfileFormSubmit (evt) {                                        // Функция изменения информации о себе на странице
    evt.preventDefault();

    let userName = nameInput.value;
    let userJob = jobInput.value;

    profileName.textContent = userName;
    profileJob.textContent = userJob;
    closeModal(profileEditPopup);
}

profileEditPopup.addEventListener("submit", handleProfileFormSubmit);           // Обработчик отправки формы


// Поп-ап добавления карточки
cardAddButton.addEventListener("click", function(){                             // Обработчик кнопки добавления карточки
    openModal(cardAddPopup);
})

function handleCardFormSubmit (evt) {                                           // Функция создания карточки на странице
    evt.preventDefault();

    
    cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));
    closeModal(cardAddPopup)
}

cardAddPopup.addEventListener("submit", handleCardFormSubmit);                  // Обработчик отправки формы


// Вывод стоковых карточек на страницу
initialCards.forEach((item) => {                                            
    cardsList.append(createCard(item.name, item.link));
})




