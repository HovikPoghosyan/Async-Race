import React, { ChangeEvent } from 'react';

import { useAppSelector } from 'store/hooks/hooks';
import ControlPanelFormRow from 'components/commons/ControlPanelFormRow/ControlPanelFormRow';
import UseControlPanelForm from './UseControlPanelForm';

import styles from './ControlPanelForm.module.scss';

function ControlPanelForm() {
   const race = useAppSelector((store) => store.garageList.race);
   const { newCar, updatedCar, handleNewCar, handleUpdatedCar, submitNewCar, submitUpdatedCar, updateBtnDisable } = UseControlPanelForm();

   return (
      <form className={styles.form}>
         <ControlPanelFormRow
            namePlaceholder="Create Car"
            name={newCar?.name}
            color={newCar?.color}
            handleName={(event: ChangeEvent<HTMLInputElement>) => handleNewCar({ name: event.target.value })}
            handleColor={(event: ChangeEvent<HTMLInputElement>) => handleNewCar({ color: event.target.value })}
            handleSubmit={submitNewCar}
            btnName="Create"
            isDisable={!newCar.name || race == 'started'}
         />
         <ControlPanelFormRow
            namePlaceholder="Select Car"
            name={updatedCar?.name}
            color={updatedCar?.color}
            handleName={(event: ChangeEvent<HTMLInputElement>) => handleUpdatedCar({ name: event.target.value })}
            handleColor={(event: ChangeEvent<HTMLInputElement>) => handleUpdatedCar({ color: event.target.value })}
            handleSubmit={submitUpdatedCar}
            btnName="Update"
            isDisable={updateBtnDisable}
         />
      </form>
   );
}

export default ControlPanelForm;
