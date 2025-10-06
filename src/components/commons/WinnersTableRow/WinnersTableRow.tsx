import React from 'react';

import CarIcon from 'assets/icons/CarIcon/CarIcon';

import { Winner } from 'store/modules/winnersListReducer';
import styles from './WinnersTableRow.module.scss';

interface WinnersTableRowProps {
   carData: Winner;
}

function WinnersTableRow({ carData }: WinnersTableRowProps) {
   const { name, color, id, time, wins } = carData;
   const icon = <CarIcon height={42} fill={color} />;

   return (
      <tr>
         <td>{id}</td>
         <td>{icon}</td>
         <td>{name}</td>
         <td>{wins}</td>
         <td>{time}</td>
      </tr>
   );
}

export default WinnersTableRow;
