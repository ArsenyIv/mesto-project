// DOM-узлы
const cardsList = document.querySelector(".places__list");                      // Контейнер для карточек
const cardsTemplate = document.querySelector("#card-template").content;         // Темплейт карточки
const popupList = document.querySelectorAll(".popup");                          // Контейнер для поп-апов
const popupClose = document.querySelectorAll(".popup__close");                  // Кнопка закрытия поп-апа

const profilePopup = document.querySelector(".popup_type_edit");                // Поп-ап редактирования профиля
const profileEdit = document.querySelector(".profile__edit-button");            // Кнопка редактирования
let profileName = document.querySelector(".profile__title");                    // Имя в профиле
let profileJob = document.querySelector(".profile__description");               // Занятие в профиле
const nameInput = document.querySelector(".popup__input_type_name");            // Поле ввода имени
const jobInput = document.querySelector(".popup__input_type_description");      // Поле ввода занятия

const cardPopup = document.querySelector(".popup_type_new-card");               // Поп-ап добавления карточки
const cardAddButton = document.querySelector(".profile__add-button");           // Кнопка добавления карточки
const cardNameInput = document.querySelector(".popup__input_type_card-name");   // Поле ввода названия карточки
const cardLinkInput = document.querySelector(".popup__input_type_url");         // Поле ввода ссылки на картинку

const imagePopup = document.querySelector(".popup_type_image");                 // Поп-ап открытия изображения
const popupImage = document.querySelector(".popup__image");                     // Изображение в поп-апе
const popupCaption = document.querySelector(".popup__caption");                 // Описание поп-апа


// Создание и удаление карточек
function createCard(title, image) {                                             // Функция создания карточки
    const card = cardsTemplate.cloneNode(true);                                 // Клонирование темплейта
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");

    cardTitle.textContent = title;
    cardImage.src = image;
    cardImage.alt = title;

    const cardDeleteButton = card.querySelector(".card__delete-button");        // Кнопка удаления карточки
    const cardLikeButton = card.querySelector(".card__like-button");            // Кнопка лайка карточки

    cardImage.addEventListener("click", function() {                            // Поп-ап открытия изображения
        popupImage.src = image;
        popupImage.alt = title;
        popupCaption.textContent = title;
        openModal(imagePopup);
    })

    cardDeleteButton.addEventListener("click", function(evt) {                  // Функция удаления карточки
        let deleteButton = evt.target;
        let currentCard = deleteButton.closest(".card");
        currentCard.remove();
    })
    
    cardLikeButton.addEventListener("click", function (evt) {                   // Функция лайка карточки
        let likeButton = evt.target;
        likeButton.classList.toggle("card__like-button_is-active");
    })

    return card;
}


// Работа с поп-апами
popupList.forEach((popup => {                                               // Анимация каждого поп-апа
    popup.classList.add("popup_is-animated");
}))

function openModal(popup) {                                                 // Функция открытия поп-апа
    popup.classList.add("popup_is-opened");

    document.addEventListener("keydown", closeByEsc(evt));
}

function closeModal(popup) {                                                // Функция закрытия поп-апа
    popup.classList.remove("popup_is-opened");

    document.removeEventListener("keydown", closeByEsc(evt));
}

function closeByEsc(evt) {                                                  // Функция закрытия поп-апа нажатием на Escape
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup)
    }
}

                                        
popupList.forEach((popup) => {                                              
    popup.addEventListener("click", function(evt){                          // Функция закрытия поп-апа кликом на оверлей   
        if (evt.target.classList.contains("popup_is-opened")){
            closeModal(popup);
        }
    })
    
    document.addEventListener("keyup", function(evt) {                         // Функция закрытия поп-апа нажатием Escape
        if(evt.key === "Escape"){
            closeModal(popup);
        }
    })
})
                                                



popupClose.forEach((button) => {                                            // Обработчик каждой кнопки закрытия поп-апов
    button.addEventListener("click", function(evt) {    
        el = evt.target;
        closeModal(el.closest(".popup"));
    })
})


// Поп-ап редактирования профиля
profileEdit.addEventListener("click", function(){                           // Обработчик события
    nameInput.placeholder = profileName.textContent;    
    jobInput.placeholder = profileJob.textContent;

    openModal(profilePopup);
})

function handleProfileFormSubmit (evt) {                                    // Функция изменения информации о себе на странице
    evt.preventDefault();

    let userName = nameInput.value;
    let userJob = jobInput.value;

    profileName.textContent = userName;
    profileJob.textContent = userJob;
    closeModal(profilePopup);
}

profilePopup.addEventListener("submit", handleProfileFormSubmit);           // Обработчик отправки формы


// Поп-ап добавления карточки
cardAddButton.addEventListener("click", function(){                         // Обработчик кнопки добавления карточки
    openModal(cardPopup);
})

function handleCardFormSubmit (evt) {                                       // Функция создания карточки на странице
    evt.preventDefault();

    cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));
    closeModal(cardPopup);
}

cardPopup.addEventListener("submit", handleCardFormSubmit);                // Обработчик отправки формы

// Вывод стоковых карточек на страницу
initialCards.forEach((item) => {                                            
    cardsList.append(createCard(item.name, item.link));
})


