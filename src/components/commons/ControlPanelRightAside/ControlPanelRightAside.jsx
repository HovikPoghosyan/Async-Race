import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { generateCars } from 'store/modules/listReducer';

import Button from '../Button/Button';

import styles from './ControlPanelRightAside.module.scss';

function ControlPanelRightAside() {
   const dispatch = useDispatch();
   const garageList = useSelector( state => state.list.garageList );

   return(
      <aside className = { styles.aside }>
         <div className = { styles.row }>
            <h2 className = { styles.title }>{ `GARAGE (count: ${ garageList.length })` }</h2>
         </div>
         <div className = { styles.row }>
            <Button 
               name = "Race"
            />
            <Button 
               name = "Reset" 
            />
            <Button 
               name = "Generate Car"
               functionality = { () => dispatch( generateCars( 100 ) ) }
            />
         </div>
      </aside>
   )
}

export default ControlPanelRightAside;