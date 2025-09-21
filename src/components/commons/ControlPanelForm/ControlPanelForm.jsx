import React from 'react';
import { useDispatch } from 'react-redux';

import ControlPanelFormRow from '../ControlPanelFormRow/ControlPanelFormRow';

import { addNewCar } from 'store/modules/listReducer';

import styles from './ControlPanelForm.module.scss';

function ControlPanelForm() {
   const dispatch = useDispatch();

   return(
      <form className = { styles.form }>
         <ControlPanelFormRow 
            handleSubmit = { carData => dispatch( addNewCar( carData ) ) }
            placeholder = "Create Car"
            btnName = "Create"
         />
         <ControlPanelFormRow 
            placeholder = "Update Car"
            btnName = "Update"
         />
      </form>
   )
}

export default ControlPanelForm;