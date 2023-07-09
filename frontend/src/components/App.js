import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// компоненты
// import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PupupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

// компоненты авторизации
import * as auth from '../auth.js';
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

// апи
import { api } from "../utils/api";

// импорт контекста
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupVisible] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupVisible] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupVisible] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupVisible] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipVisible] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [regStatus, setRegStatus] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCardsArray] = React.useState([]);

  // авторизация_________________
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(null);

  const navigate = useNavigate();

  // рендер данных при открытии страницы
  React.useEffect(() => {
    if(isLoggedIn === true) {
    Promise.all([api.getInfoAboutUser(), api.getInitialCards()])
    .then(([userInfo, cards]) => {
      setCurrentUser(userInfo);
      setCardsArray(cards.reverse());
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })};
    return;
  }, [isLoggedIn]);

  //обновление данных профиля 
  function handleUpdateUser(currentUser) {
    api.editProfileInfo(currentUser)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // обновление аватара
  function handleUpdateAvatar(avatarUrl) {
    api.editAvatar(avatarUrl)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // добавление карточки
  function handleAddPlaceSubmit(card) {
    api.sendCard(card)
    .then((res) => {
      setCardsArray([res.data, ...cards]);  // остановился тут. После создания карточки, серв возвращает объект карточки а не весь массив
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // попап удаления карточки
  // function handleDeleteCardClick() {
  //   setDeleteCardPopupVisible(true);
  // }

  // функция удаления карточки
  function handleCardDelete(card) {
    console.log(cards)
    api.deleteCard(card._id)
    .then(() => {
      const cardToDelete = card;
      setCardsArray(cards.filter((card) => card !== cardToDelete))
    })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // открытие карточки в фуллскрин
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // попап формы профиля
  function handleEditProfileClick() {
    setEditProfilePopupVisible(true);
  }

  // попап формы добавления карточки
  function handleAddPlaceClick() {
    setAddPlacePopupVisible(true);
  }
  
  // попап формы аватарки
  function handleEditAvatarClick() {
    setAvatarPopupVisible(true);
  }

  // функция переключения лайка
  function handleCardLike(card) {
    // console.log(card)
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCardsArray((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
    .catch((err) => {
      console.log(`ошибка ${err}`);
    })
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setEditProfilePopupVisible(false);
    setAddPlacePopupVisible(false);
    setAvatarPopupVisible(false);
    setSelectedCard();
    setDeleteCardPopupVisible(false);
    setInfoTooltipVisible(false);
  }

  // если в локальном хранилище валидный токен => залогинить пользователя и отправить в мейн страницу
  function checkToken() {
    // const jwt = localStorage.getItem('jwt');
    // неправильно назвал функцию, функция возвращает информацию о пользователе
    auth.tokenValidate()
    .then((data) => {
      if(data) {
        setCurrentUser(data);
        setLoggedIn(true);
        navigate('/', {replace: true});
        handleEmailChange(data.data.email);
      } else {
        setLoggedIn(false);
        navigate('/sign-in', {replace: true})
      }
    })
    .catch((err) => {
      console.log(err);
      setLoggedIn(false);
    })
  }

  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLoggedIn(res) {
    setLoggedIn(true);
  }

  function handleEmailChange(email) {
    setUserEmail(email);
  }

  function handleEmailClear() {
    setUserEmail(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='wrapper'>
        <div className="content">

          {/* <Header isLoggedIn={isLoggedIn}/> */}

          <Routes>

            <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn} 
              element={() => <Main
                cards={cards} 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                // onDeleteButtonClick={handleDeleteCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                setLoggedIn={setLoggedIn}
                handleEmailClear={handleEmailClear}
                userEmail={userEmail}
              />} 
              />} 
            />         

            {/* для регистрации пользователя */}
            <Route path="/sign-up" element={<Register onTooltipOpen={setInfoTooltipVisible} setRegStatus={setRegStatus} />}/>

            {/* для авторизации */}
            <Route path="/sign-in" element={<Login onLoggedIn={handleLoggedIn} handleEmailChange={handleEmailChange} onTooltipOpen={setInfoTooltipVisible} />} />

            {/* мейн блок. LoggedIn === true? тода отрисовать мейн, иначе - отправить на /sign-in */}
            <Route path="/" element={isLoggedIn ? 
              <Main 
                cards={cards} 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                // onDeleteButtonClick={handleDeleteCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}             
              /> 
            : <Navigate to='/sign-in' replace />} />

            <Route path='*' element={
              <>
                <Header></Header>
                <p style={{minHeight: "calc(100vh - 313px)", textAlign: 'center', fontSize: '24px'}}>Такой страницы не существует</p>
              </>
            } />
            
          </Routes>

          <Footer />

          <InfoTooltip 
            regStatus={regStatus}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          />

          {/* попап аватарки */}
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* попап формы профиля */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            // user={currentUser}
          />

          {/* попап формы добавления карточки */}
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          {/* открытая карточка */}
          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
          />

          {/* попап удаления карточки */}
          <PopupWithForm
            name='delete-card'
            isOpen={isDeleteCardPopupOpen}
            title='Вы уверены?'
            onClose={closeAllPopups}
            buttonText='Да'
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
