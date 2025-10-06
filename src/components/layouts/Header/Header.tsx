import React, { FC } from 'react';
import classNames from 'classnames';

import Logo from 'components/commons/Logo/Logo';
import NavBar from 'components/featues/NavBar/NavBar';

import styles from './Header.module.scss';

function Header() {
   return (
      <header className={styles.header}>
         <Logo />
         <NavBar />
      </header>
   );
}

export default Header;
