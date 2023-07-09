import React from "react";
import PopupWithForm from "./PupupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const titleRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: titleRef.current.value,
            link: linkRef.current.value
        });
        console.log({
            name: titleRef.current.value,
            link: linkRef.current.value
        })
    }

    return (
        <PopupWithForm 
            name='add-card'
            isOpen={isOpen}
            title='Новое место'
            buttonText='Сохранить'
            onClose={onClose}
            onSubmit={handleSubmit}
          >
            <input 
              name="title"
              placeholder="Название"
              className="popup__input"
              type='text'
              required minLength={2} maxLength={30}
              ref={titleRef}
            />
            <span 
              className="popup__error"
            />
            <input 
              name="link"
              placeholder="Ссылка на картинку"
              className="popup__input"
              type='url'
              required
              ref={linkRef}
            />
            <span 
              className="popup__error"
            />
          </PopupWithForm>
    )
}

export default AddPlacePopup;