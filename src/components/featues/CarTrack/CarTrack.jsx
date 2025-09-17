import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/commons/Button/Button';

import CarIcon from 'assets/icons/CarIcon/CarIcon';

import styles from './CarTrack.module.scss';

function CarTrack() {

   return(
      <div className = { styles.carTrack}>
         <h4 className = { styles.carName }>Tesla Model 3</h4>
         <div className = { styles.controlBlock }>
            <Button style = { styles.controlBlockBtn } name = { <FontAwesomeIcon icon = { faPlay } color = "#28a745" /> }/>
            <Button style = { styles.controlBlockBtn } name = { <FontAwesomeIcon icon = { faStop } color = "#ffc107" /> }/>
            <Button style = { styles.controlBlockBtn } name = { <FontAwesomeIcon icon = { faCheck } color = "#48bfeeff" /> }/>
            <Button style = { styles.controlBlockBtn } name = { <FontAwesomeIcon icon = { faTrash } color = "#dc3545"/> }/>
         </div>
         <CarIcon style = { styles.car } width = { 100 } height = { 42 }  fill = "#ccc" />
      </div>
   )
}




export default CarTrack;
