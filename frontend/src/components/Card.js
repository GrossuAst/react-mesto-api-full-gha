import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onDeleteButtonClick, onCardLike, onCardDelete}) {

    // console.log(card)

    function handleClick() {
        onCardClick(card);
      }

    function handleLikeClick() {
        // console.log(card);
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`);

    return(
        <article className="card" key={card._id}>
            {isOwn && <button type="button"
                aria-label="кнопка удаления карточки"
                className="card__delete-button" 
                onClick={handleDeleteClick}
                // onClick={onDeleteButtonClick}
            />}
            <img src={card.link} alt={card.name} className="card__photo" onClick={handleClick}/>
            <div className="card__description">
                <h3 className="card__title">{card.name}</h3>
                <div className="card__likes-section">
                    <button type="button" aria-label="кнопка переключения лайка" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="card__likes-counter">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;