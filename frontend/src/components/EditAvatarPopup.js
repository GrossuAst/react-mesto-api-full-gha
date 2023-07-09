import React from "react";
import PopupWithForm from "./PupupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            name='avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            onSubmit={handleSubmit}
        >
            <input 
                placeholder='Ссылка на аватар'
                className="popup__input"
                ref={avatarRef}
            />
            <span 
              className="popup__error"
            />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;