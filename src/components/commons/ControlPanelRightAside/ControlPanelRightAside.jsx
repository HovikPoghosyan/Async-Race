import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faArrowRight,
   faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../Button/Button';

import styles from './ControlPanelRightAside.module.scss';

function ControlPanelRightAside() {

   return(
      <aside className = { styles.aside }>
         <h2 className = { styles.title }>GARAGE (104 cars)</h2>
         <div className = { styles.row }>
            <Button name = { <FontAwesomeIcon icon = { faArrowLeft } /> }/>
            <p>Page #13</p>
            <Button name = { <FontAwesomeIcon icon = { faArrowRight } /> }/>
         </div>
      </aside>
   )
}

export default ControlPanelRightAside;