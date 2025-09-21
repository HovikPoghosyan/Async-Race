import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import { fetchCarStart } from 'CONSTANTS/Axios';
import { deleteCar } from 'store/modules/listReducer';

import Button from 'components/commons/Button/Button';
import CarIcon from 'assets/icons/CarIcon/CarIcon';
import StartLight from '../StartLight/StartLight';

import styles from './GarageTableRow.module.scss';

function CarTrack({ carData }) {
   const { id, name, color } = carData;
   const dispatch = useDispatch();

   const [ isSelected, setIsSelected ] = useState( false );
   const [ racing, setRacing ] = useState( false );
   
   return(
      <div className = { styles.carTrack}>
         <h4 className = { styles.carName }>{ name }</h4>
         <StartLight raceState = { racing }/>
         <div className = { styles.controlBlock }>
            <Button 
               isDisable = { racing }
               style = { styles.controlBlockBtn } 
               name = { <FontAwesomeIcon icon = { faPlay } color = "#28a745" /> }
               functionality = { () => { 
                  setRacing( true )
                  fetchCarStart( id, 'started' )
               } }
            />
            <Button 
               isDisable = { !racing }
               style = { styles.controlBlockBtn } 
               name = { <FontAwesomeIcon icon = { faStop } color = "#ffc107" /> }
               functionality = { () => setRacing( false ) }
            />
            <Button 
               style = { styles.controlBlockBtn } 
               name = { <FontAwesomeIcon icon = { faCheck } color = { isSelected ? "#48bfeeff" : "#ccc" } /> }
               functionality = { () => setIsSelected( !isSelected ) }
            />
            <Button 
               isDisable = { racing }
               style = { styles.controlBlockBtn } 
               name = { <FontAwesomeIcon icon = { faTrash } color = "#dc3545"/> }
               functionality = { () => dispatch( deleteCar( id ) ) }
            />
         </div>
         <CarIcon style = { styles.car } width = { 100 } height = { 42 }  fill = { color } />
      </div>
   )
}




export default CarTrack;
