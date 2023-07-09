import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';
import Header from './Header';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteButtonClick, onCardLike, onCardDelete, setLoggedIn, handleEmailClear, userEmail}) {

    // подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const navigate = useNavigate();

    function signOut() {
        // localStorage.removeItem('jwt');
        setLoggedIn(false);
        navigate('/', {replace: true});
        handleEmailClear(null);
    }
    
    return (
        <>
            <Header>
                <div className='header__nav'>
                    <p >{userEmail}</p>
                    <Link className='header__auth-text' to='/sign-in'onClick={signOut}>Выйти</Link>
                </div>
            </Header>
            <main className="main">
                <section className="profile">
                    <div className="profile__redact">
                        <button className="profile__avatar-overlay"
                            onClick={onEditAvatar}
                            style={{ 
                                backgroundImage: `url(${currentUser.data.avatar})`,
                                backgroundSize: 'cover'
                        }}
                        >
                        </button>
                        <h1 className="profile__name">{currentUser.data.name}</h1>
                        <p className="profile__description">{currentUser.data.about}</p>
                        <button type="button" aria-label="кнопка открытия попапа редактирования профиля" 
                            className="profile__edit-button"
                            onClick={onEditProfile}
                        >
                        </button>
                    </div>
                    <button type="button" aria-label="кнопка открытия попапа добавления карточки" 
                        className="profile__add-button"
                        onClick={onAddPlace}
                        >
                    </button>
                </section>
                <section className="elements">
                    {cards.map((card) => (
                        <Card card={card} key={card._id} 
                        onCardClick={onCardClick} 
                        onDeleteButtonClick={onDeleteButtonClick} 
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        />
                    ))}
                </section>
            </main>
        </>
    );
  }
  
  export default Main;