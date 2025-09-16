import React from 'react';

import NavButton from 'components/commons/NavButton/NavButton';

import styles from './NavBar.module.scss';

function NavBar() {

   return(
      <nav className = { styles.navBar }>
         <ul>
            <NavButton link = "garage" name = "Garage" />
            <NavButton link = "winners" name = "Winners" />
         </ul>
      </nav>
   )
}

export default NavBar;