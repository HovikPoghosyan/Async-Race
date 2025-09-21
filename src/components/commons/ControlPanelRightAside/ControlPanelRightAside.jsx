import React from 'react';
import { useSelector } from 'react-redux';

import Button from '../Button/Button';

import styles from './ControlPanelRightAside.module.scss';

function ControlPanelRightAside() {
   const garageList = useSelector( state => state.list.garageList );
   
   return(
      <aside className = { styles.aside }>
         <div className = { styles.row }>
            <h2 className = { styles.title }>{ `GARAGE (count: ${ garageList.length })` }</h2>
         </div>
         <div className = { styles.row }>
            <Button name = "Race" />
            <Button name = "Reset" />
            <Button name = "Generate Car" />
         </div>
      </aside>
   )
}

export default ControlPanelRightAside;