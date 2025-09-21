import React from 'react';

import CarIcon from 'assets/icons/CarIcon/CarIcon';

import styles from './WinnersTableRow.module.scss';

function WinnersTableRow({ carData }) {
   const { name, color, id, time, wins } = carData;
   const icon = <CarIcon height = { 42 }  fill = { color } />;

   return (
      <tr>
         <td>{ id }</td>
         <td>{ icon }</td>
         <td>{ name }</td>
         <td>{ wins }</td>
         <td>{ time }</td>
      </tr>
   )
}

export default WinnersTableRow;