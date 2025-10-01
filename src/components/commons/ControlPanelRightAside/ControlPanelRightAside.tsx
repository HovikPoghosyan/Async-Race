import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';

import { generateCars, setRace } from 'store/modules/garageListReducer';

import Button from '../Button/Button';

import styles from './ControlPanelRightAside.module.scss';

function ControlPanelRightAside() {
   const dispatch = useAppDispatch();
   const { garageList, loading, race } = useAppSelector((state) => state.garageList);
   return (
      <aside className={styles.aside}>
         <div className={styles.row}>
            <h2 className={styles.title}>{`GARAGE (count: ${garageList.length})`}</h2>
         </div>
         <div className={styles.row}>
            <Button
               name="Race"
               isDisable={loading || !(!race || race == 'stopped') || garageList.length == 0}
               functionality={() => dispatch(setRace('started'))}
            />
            <Button name="Reset" isDisable={loading || !!(!race || race == 'stopped')} functionality={() => dispatch(setRace('stopped'))} />
            <Button name="Generate Car" isDisable={loading || !(!race || race == 'stopped')} functionality={() => dispatch(generateCars(100))} />
         </div>
      </aside>
   );
}

export default ControlPanelRightAside;
