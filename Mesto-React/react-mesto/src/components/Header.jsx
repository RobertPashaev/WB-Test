import React from 'react';
import logo from '../images/header__logo.svg';

export default function Header() {
  return (
    <header className='header'>
      <img alt='MestoLogo' src={logo} className='header__logo' />
    </header>
  );
}
