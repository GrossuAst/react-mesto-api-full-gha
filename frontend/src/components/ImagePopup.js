import React from "react";

function ImagePopup({card, onClose}) {
    return(
        <div className={`popup popup_type_fullscreen ${card ? "popup_opened" : "" }`}>
            <article className="popup__fullsceen-container">
                <img src={card?.link} alt={card?.name} className="popup__fullscreen-image"/>
                <h3 className="popup__fullscreen-title">{card?.name}</h3>
                <button type="button" aria-label="закрыть фуллскрин фото" className="popup__close-icon popup__close-icon_type_fullscreen"
                    onClick={onClose}
                />
            </article>
        </div>
    )
}

export default ImagePopup;