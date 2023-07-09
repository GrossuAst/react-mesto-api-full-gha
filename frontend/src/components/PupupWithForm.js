import React from "react";

function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : "" }` }>
            <div className="popup__container">
                <form action="" className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    <button type="button" aria-label="#" className="popup__close-icon" onClick={props.onClose}></button>
                    <h2 className="popup__title">{props.title}</h2>
                    <div className="popup__inputs">
                        {props.children}
                    </div>                                    
                    <button type="submit" className="popup__submit-button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;