import React from 'react';
import classNames from 'classnames';

import Logo from 'components/commons/Logo/Logo';
import NavBar from 'components/featues/NavBar/NavBar';

import styles from './Header.module.scss';

function Header() {

   return(
      <div className = { classNames( styles.header, 'container' )} >
         <Logo />
         <NavBar />
      </div>
   )
}

export default Header;