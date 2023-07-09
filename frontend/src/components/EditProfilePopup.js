import React from "react";
import PopupWithForm from "./PupupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(() => currentUser.name ? currentUser.name : '');
        setDescription(() => currentUser.about ? currentUser.about : '');
    }, [currentUser])

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm 
            isOpen={isOpen}
            onClose={onClose}
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            onSubmit={handleSubmit}
          > 
            <input
                value={name}         
                onChange={handleNameChange}  
                type="text"
                name="name"
                placeholder="Имя"
                className="popup__input"
                required minLength={2} maxLength={40} 
            />
            <span 
                className="popup__error"
            />
            <input 
                value={description}
                onChange={handleDescriptionChange}
                type="text"
                name="about"
                placeholder="О себе"
                className="popup__input"
                required minLength={2} maxLength={200}
            />
            <span 
              className="popup__error"
            />
          </PopupWithForm>
    )
}

export default EditProfilePopup;