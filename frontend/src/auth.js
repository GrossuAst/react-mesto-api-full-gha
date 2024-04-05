// export const BASE_URL = 'https://api.grossuast.mesto.nomoredomains.xyz';
export const BASE_URL = 'http://localhost:4000';

export function register(password, email) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include',
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
        credentials: 'include',
        body: JSON.stringify({password, email})
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        
        return Promise.reject(`Ошибка ${res.status}`);
    })
}

// неправильно назвал функцию, функция должна вернуть информацию о пользователе
export function tokenValidate() {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            // "Authorization" : `Bearer ${jwt}`
        },
        credentials: 'include'
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
}

// запрос логаута
export function logout() {
    return fetch(`${BASE_URL}/logout`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err.status);
    })
}