import React, { useState, useEffect } from 'react';

import Button from '../Button/Button';

import styles from './ControlPanelFormRow.module.scss';

function ControlPanelFormRow({ namePlaceholder, name, color, handleName, handleColor, handleSubmit, btnName, isDisable }) {
   
   return(
      <div className = { styles.row }>
         <input 
            placeholder = { namePlaceholder } 
            value = { name }
            onChange = { handleName }
            className = { styles.nameInput }
         />
         <input 
            type = "color" 
            value = { color } 
            onChange = { handleColor }
            className = { styles.colorBox }
         />
         <Button 
            name = { btnName } 
            isDisable = { isDisable } 
            functionality = { event => {
               event.preventDefault();
               handleSubmit();
            } }
         />
      </div>
   )
}

export default ControlPanelFormRow;