import React from 'react';

import Button from '../Button/Button';

import styles from './ControlPanelLeftAside.module.scss';

function ControlPanelLeftAside() {

   return(
      <aside className = { styles.aside }>
         <div className = { styles.row }>
            <input placeholder = "Create Car" className = { styles.nameInput }/>
            <input type = "color" name = "create car color" className = { styles.colorBox }/>
            <Button name = "Create" />
         </div>
         <div className = { styles.row }>
            <input placeholder = "Update Car" className = { styles.nameInput }/>
            <input type = "color" name = "create car color" className = { styles.colorBox }/>
            <Button name = "Update" />
         </div>
      </aside>
   )
}

export default ControlPanelLeftAside;