import { apiConfig } from "./utils";

export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
    }
    
    // метод для получения информации о пользователе
    getInfoAboutUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,      
        })
            .then(this._checkResponse) 
    };

    // метод для получения данных о карточках
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers 
        })
            .then(this._checkResponse)
    };

    // метод для редактирования профиля
    editProfileInfo(userInfo) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
            name: userInfo.name,
            about: userInfo.about
        })},
        )
            .then(this._checkResponse)
    }

    // метод для отрисовки аватарки
    editAvatar(avatarUrl) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
            avatar: avatarUrl
        })},
        )
            .then(this._checkResponse)
    }
    
    // отправка карточки на сервер
    sendCard(object) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: object.name, 
                link: object.link
            })
        })
        .then(this._checkResponse)
    }

    // удаление карточки с сервера
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    
    // поставить лайк
    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // удалить лайк
    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // переключение лайка
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

}

// const apiConfig = {
//     url: 'https://mesto.nomoreparties.co/v1/cohort-63',
//     headers: {
//       authorization: 'e900e361-a4f9-4167-b7d1-fcc078aa308a',
//       'Content-Type': 'application/json'
//     }
//   };

export const api = new Api(apiConfig);