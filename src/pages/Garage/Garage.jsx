import React from 'react';
import classNames from 'classnames';

import GarageControlPanel from 'components/featues/GarageControlPanel/GarageControlPanel';
import GarageTable from 'components/featues/GarageTable/GarageTable';

import styles from './Garage.module.scss';

function Garage() {

   return(
      <div className = { classNames( 'container', styles.garage ) }>
         <GarageControlPanel />
         <GarageTable />
      </div>
   )
} 

export default Garage;