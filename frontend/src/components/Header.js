import React from 'react';
import headerLogo from '../images/icons/header-logo.svg';

function Header(props) {

    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип страницы" className="header__logo" />
            {props.children}
        </header>
    );
  }
  
  export default Header;