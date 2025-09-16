import React from 'react';

import GarageControlPanel from 'components/featues/GarageControlPanel/GarageControlPanel';

import styles from './Garage.module.scss';

function Garage() {

   return(
      <div className = "container">
         <GarageControlPanel />
      </div>
   )
}

export default Garage;