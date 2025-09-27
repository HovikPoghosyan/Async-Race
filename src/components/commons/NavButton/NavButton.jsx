import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './NavButton.module.scss';

function NavButton({ link, name }) {
   return (
      <li>
         <NavLink
            to={link.toLowerCase()}
            className={({ isActive }) =>
               classNames(styles.navButton, { [styles.isActive]: isActive })
            }
         >
            {name}
         </NavLink>
      </li>
   );
}

export default NavButton;
