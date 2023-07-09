export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(password, email) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email })
    })
    .then((res) => { 
        if(res.ok) {
            return res.json;
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
}

export function authorize(password, email) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        
        return Promise.reject(`Ошибка ${res.status}`);
    })
}

export function tokenValidate(jwt) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
}