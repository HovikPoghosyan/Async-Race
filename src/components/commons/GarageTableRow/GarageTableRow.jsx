import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import { fetchCarDrive } from 'CONSTANTS/Axios';
import { deleteCar, setSelectedCar } from 'store/modules/listReducer';

import Button from 'components/commons/Button/Button';
import CarIcon from 'assets/icons/CarIcon/CarIcon';
import StartLight from '../StartLight/StartLight';

import styles from './GarageTableRow.module.scss';

function CarTrack({ carData }) {
   const dispatch = useDispatch();
   const { id, name, color } = carData;
   const selectedCar = useSelector( store => store.list.selectedCar );
   const [ racing, setRacing ] = useState( false );
   const [ speed, setSpeed ] = useState( 0 );
   const animationStyle = { animation: `${ styles.moveToEnd } ${ speed }s linear 4.2s forwards` };
   
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
                  setRacing( true );
                  fetchCarDrive( id, 'started' )
                  .then( response => {
                     console.log('data: ', response)
                     setSpeed( response.distance / ( response.velocity * 2000 ) )
                  } );
               }}
            />
            <Button 
               isDisable = { !racing }
               style = { styles.controlBlockBtn } 
               name = { <FontAwesomeIcon icon = { faStop } color = "#ffc107" /> }
               functionality = { () => {
                  setRacing( false );
                  fetchCarDrive( id, 'stopped' );
               }}
            />
            <Button 
               style = { styles.controlBlockBtn } 
               name = { <FontAwesomeIcon icon = { faCheck } color = { selectedCar?.id == id ? "#48bfeeff" : "#ccc" } /> }
               functionality = { () => dispatch( setSelectedCar( selectedCar?.id == id ? undefined : carData ) ) }
            />
            <Button 
               isDisable = { racing }
               style = { styles.controlBlockBtn } 
               name = { <FontAwesomeIcon icon = { faTrash } color = "#dc3545"/> }
               functionality = { () => dispatch( deleteCar( id ) ) }
            />
         </div>
         <CarIcon 
            className = { styles.car }
            style = { racing ? animationStyle : {} }
            width = { 100 } 
            height = { 42 }  
            fill = { color } 
         />
      </div>
   )
}




export default CarTrack;
