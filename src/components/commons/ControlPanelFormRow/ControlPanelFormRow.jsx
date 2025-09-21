import React, { useState } from 'react';

import Button from '../Button/Button';

import styles from './ControlPanelFormRow.module.scss';

function ControlPanelFormRow({ placeholder, btnName, handleSubmit }) {
   const [ name, setName ] = useState( '' );
   const [ color, setColor ] = useState( '#423d4d' );

   return(
      <div className = { styles.row }>
         <input 
            placeholder = { placeholder } 
            value = { name }
            onChange = { event  => setName( event.target.value )}
            className = { styles.nameInput }
         />
         <input 
            type = "color" 
            value = { color } 
            onChange = { event  => setColor( event.target.value ) }
            className = { styles.colorBox }
         />
         <Button 
            name = { btnName } 
            isDisable = { !name } 
            functionality = { event => {
               event.preventDefault();
               setName( '' );
               setColor( '#423d4d' );
               return handleSubmit({ name, color });
            } }
         />
      </div>
   )
}

export default ControlPanelFormRow;