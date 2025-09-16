import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

function Button({ name, functionality, isDisable = false, style, isActive = false }) {

   return(
      <button
         isDisable = { isDisable }
         onClick = { functionality }
         className = { classnames( { [ styles.isActive ]:  isActive }, styles.button, style ) }
      >
         { name }
      </button>
   )
}

export default Button;