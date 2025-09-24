import React from 'react';

import ControlPanelFormRow from '../ControlPanelFormRow/ControlPanelFormRow';
import UseControlPanelForm from './UseControlPanelForm';

import styles from './ControlPanelForm.module.scss';

function ControlPanelForm() {
   const { 
      newCar,
      updatedCar,
      handleNewCar,
      handleUpdatedCar,
      submitNewCar,
      submitUpdatedCar,
      createBtnDisable,
      updateBtnDisable, 
   } = UseControlPanelForm();

   return(
      <form className = { styles.form }>
         <ControlPanelFormRow 
            namePlaceholder = "Create Car"
            name = { newCar?.name }
            color = { newCar?.color }
            handleName = { event => handleNewCar({ name: event.target.value })}
            handleColor = { event => handleNewCar({ color: event.target.value })}
            handleSubmit = { submitNewCar }
            btnName = "Create"
            isDisable = { !newCar.name }
         />
         <ControlPanelFormRow 
            namePlaceholder = "Select Car" 
            name = { updatedCar?.name }
            color = { updatedCar?.color }
            handleName = { event => handleUpdatedCar({ name: event.target.value })}
            handleColor = { event => handleUpdatedCar({ color: event.target.value })}
            handleSubmit = { submitUpdatedCar }
            btnName = "Update"
            isDisable = { updateBtnDisable }
         />
      </form>
   )
}

export default ControlPanelForm;