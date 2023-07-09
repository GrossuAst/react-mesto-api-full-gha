import React from "react";
import Union from "../images/icons/Union.svg";
import errorIcon from "../images/icons/error-icon.svg";

function InfoTooltip(props) {

    return(
        <div className={`popup  ${props.isOpen ? "popup_opened" : "" }` }>
            <div className="popup__container popup_type_tooltip">
                <button type="button" aria-label="#" className="popup__close-icon" onClick={props.onClose}></button>
                <img className="popup__image" alt='иконка результата регистрации' src={ props.regStatus ? Union :   errorIcon }></img>
                <h2 className="popup__title">{ props.regStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }</h2>                                 
            </div>
        </div>
    ) 
}

export default InfoTooltip;