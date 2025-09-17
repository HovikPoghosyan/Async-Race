import React from 'react';

import Button from '../Button/Button';

import styles from './ControlPanelRightAside.module.scss';

function ControlPanelRightAside() {

   return(
      <aside className = { styles.aside }>
         <h2 className = { styles.title }>GARAGE (104 cars)</h2>
         <div className = { styles.row }>
            <Button name = "Race" />
            <Button name = "Reset" />
            <Button name = "Generate Car" />
         </div>
      </aside>
   )
}

export default ControlPanelRightAside;