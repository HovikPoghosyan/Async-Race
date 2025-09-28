import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { setRace } from 'store/modules/listReducer';
import { useAppDispatch } from 'store/hooks/hooks';

import styles from './NavButton.module.scss';

interface NavButtonProps {
   link: string;
   name: string;
}

function NavButton({ link, name }: NavButtonProps) {
   const dispatch = useAppDispatch();
   console.log('name: ', name)
   return (
      <li>
         <NavLink
            onClick={() => { 
               if( name == 'WINNERS' ) dispatch( setRace( false ) );
            }}
            to={link.toLowerCase()}
            className={({ isActive }) => classNames(styles.navButton, { [styles.isActive]: isActive })}
         >
            {name}
         </NavLink>
      </li>
   );
}

export default NavButton;
