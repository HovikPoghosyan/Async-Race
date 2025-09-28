import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './NavButton.module.scss';

interface NavButtonProps {
   link: string;
   name: string;
}

function NavButton({ link, name }: NavButtonProps) {
   return (
      <li>
         <NavLink
            to={link.toLowerCase()}
            className={({ isActive }) => classNames(styles.navButton, { [styles.isActive]: isActive })}
         >
            {name}
         </NavLink>
      </li>
   );
}

export default NavButton;
