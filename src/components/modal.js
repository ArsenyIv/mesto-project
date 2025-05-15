const popupList = document.querySelectorAll(".popup");                                  // Контейнер для поп-апов
const popupCloseButton = document.querySelectorAll(".popup__close");                    // Кнопка закрытия поп-апа



// Анимация каждого поп-апа
popupList.forEach((popup => {                                               
    popup.classList.add("popup_is-animated");
}))

// Функция открытия поп-апа
export const openModal = (popup) => {                                                 
    popup.classList.add("popup_is-opened");

    document.addEventListener("keydown", closeByEsc);
}

// Функция закрытия поп-апа
export const closeModal = (popup) => {                                                
    popup.classList.remove("popup_is-opened");

    document.removeEventListener("keydown", closeByEsc);
}

// Функция закрытия поп-апа нажатием на Escape
export const closeByEsc = (evt) => {                                                  
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup)
    }
}
                                        

popupList.forEach((popup) => {                                              
    popup.addEventListener("click", function(evt){                            
        if (evt.target.classList.contains("popup_is-opened")){          // Функция закрытия поп-апа кликом на оверлей
            closeModal(popup);
        }
    })
    
    document.addEventListener("keyup", function(evt) {                  // Функция закрытия поп-апа нажатием Escape                     
        if(evt.key === "Escape"){
            closeModal(popup);
        }
    })
})
                                                
// Обработчик каждой кнопки закрытия поп-апов
popupCloseButton.forEach((button) => {                                            
    button.addEventListener("click", function(evt) {    
        closeModal(evt.target.closest(".popup"));
    })
})