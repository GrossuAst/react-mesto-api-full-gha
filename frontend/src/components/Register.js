import React from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "./Header";
import * as auth from '../auth.js';

function Register({onTooltipOpen, setRegStatus}) {

    const navigate = useNavigate();

    const [formValue, setFormValue] = React.useState({
        password: '',
        email: ''
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
        // console.log(evt.target.value)
    }

    // запрос на регистрацию
    function handleSubmit(evt) {
        evt.preventDefault();
        auth.register(formValue.password, formValue.email)
        .then(() => {
            navigate('/sign-in');
            onTooltipOpen(true);
            setRegStatus(true);
        })
        .catch((err) => {
            onTooltipOpen(true);
            setRegStatus(false);
        })
        }

    return(
        <>
            <Header><Link className='header__auth-text' to='/sign-in'>Войти</Link></Header>
            {/* адрес компонента в браузере '/sign-up' */}
            <form className="auth-form" onSubmit={handleSubmit}>
                <p className="auth-form__title">Регистрация</p>
                <div className="auth-form__input-place">
                    <input className="auth-form__input" 
                        onChange={handleChange}
                        value={formValue.email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Email'
                        required
                    />
                    <input className="auth-form__input"
                        value={formValue.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        placeholder='Пароль'
                        required
                    />
                </div>
                <button className="auth-form__submit-button" type="submit">Зарегистрироваться</button>
                <p className="auth-form__text">Уже зарегестрированы?<Link className="auth-form__link" to='/sign-in'> Войти</Link></p>
            </form>
        </>
    ) 
}

export default Register;