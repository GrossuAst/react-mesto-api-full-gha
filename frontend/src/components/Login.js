import React from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "./Header";
import * as auth from '../auth.js';

function Login({onLoggedIn, handleEmailChange, onTooltipOpen}) {

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
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        auth.authorize(formValue.password, formValue.email)
        .then((res) => {
            setFormValue({password: '', email: ''});
            onLoggedIn(res);
            navigate('/');
            handleEmailChange(formValue.email);
            // console.log(formValue.email);
            // console.log(res);
            localStorage.setItem('jwt', res.token);
        // auth.tokenValidate(res.token)
        // .then((res) => {
        //     handleEmailChange(res.data.email);
        // })
        })
        .catch((err) => {
            // console.log(err);
            onTooltipOpen(true);
        })
    }

    return(
        <>
            <Header formValue ><Link className='header__auth-text' to='/sign-up' >Регистрация</Link></Header>
            {/* находится на /sign-in */}
            <form className="auth-form" onSubmit={handleSubmit}>
                <p className="auth-form__title">Вход</p>
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
                        onChange={handleChange}
                        value={formValue.password}
                        id="password"
                        name="password"
                        type="password"
                        placeholder='Пароль'
                        required
                    />
                </div>
                
                <button className="auth-form__submit-button" type="submit">Войти</button>
            </form>
        </>
    ) 
}

export default Login;