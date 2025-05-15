import { openModal } from "./modal";


const arkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinskOblast = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const kholmogorskyRayon = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

const cardsTemplate = document.querySelector("#card-template").content;         // Темплейт карточки
const openImagePopup = document.querySelector(".popup_type_image");                 // Поп-ап открытия изображения
const popupImage = document.querySelector(".popup__image");                     // Изображение в поп-апе
const popupCaption = document.querySelector(".popup__caption");                 // Описание поп-апа


export const initialCards = [
    {
      name: "Архыз",
      link: arkhyz,
    },
    {
      name: "Челябинская область",
      link: chelyabinskOblast,
    },
    {
      name: "Иваново",
      link: ivanovo,
    },
    {
      name: "Камчатка",
      link: kamchatka,
    },
    {
      name: "Холмогорский район",
      link: kholmogorskyRayon,
    },
    {
      name: "Байкал",
      link: baikal,
    }
];

// Функция создания карточки
export const createCard = (title, image) => {                                            
    const newCard = cardsTemplate.cloneNode(true);                                 // Клонирование темплейта
    const cardTitle = newCard.querySelector(".card__title");
    const cardImage = newCard.querySelector(".card__image");

    cardTitle.textContent = title;
    cardImage.src = image;
    cardImage.alt = title;

    const cardDeleteButton = newCard.querySelector(".card__delete-button");        // Кнопка удаления карточки
    const cardLikeButton = newCard.querySelector(".card__like-button");            // Кнопка лайка карточки

    cardDeleteButton.addEventListener("click", function(evt) {                  // Функция удаления карточки
        let deleteButton = evt.target;
        let currentCard = deleteButton.closest(".card");
        currentCard.remove();
    })
    
    cardLikeButton.addEventListener("click", function (evt) {                   // Функция лайка карточки
        let likeButton = evt.target;
        likeButton.classList.toggle("card__like-button_is-active");
    })

    cardImage.addEventListener("click", function() {                            
      popupImage.src = image;
      popupImage.alt = title;
      popupCaption.textContent = title;
      openModal(openImagePopup);

    })

    return newCard;
}