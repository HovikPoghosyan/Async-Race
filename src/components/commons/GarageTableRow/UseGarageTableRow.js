import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleGarageRaceStatusesHistory } from 'Storages/SessionStorage';
import { fetchCarDrive } from 'CONSTANTS/Axios';
import { deleteCar, setSelectedCar } from 'store/modules/listReducer';

import styles from './GarageTableRow.module.scss';

function UseGarageTableRow( carData ) {
   const dispatch = useDispatch();
   const { id } = carData;
   const selectedCar = useSelector( store => store.list.selectedCar );
   const [ speed, setSpeed ] = useState( 0 );
   const [ raceStatus, setRaceStatus ] = useState( handleGarageRaceStatusesHistory( 'getItem', { key: id } ) || 'stopped' );
   const animationStyle = { animation: `${ styles.moveToEnd } ${ speed }s linear 4.2s forwards` };

   useEffect( () => {
      handleGarageRaceStatusesHistory( 'update', { key: id, newValue: raceStatus != 'stopped' ? 'finished' : 'stopped' } );
   }, [ raceStatus ] );

   const handleStart = () => {
      dispatch( setSelectedCar( undefined ) );
      setRaceStatus( 'started' );
      fetchCarDrive( id, 'started' )
      .then( response => {
         if ( response?.isFailed ) setRaceStatus( 'stopped' );
         else {
            const speedNewValue = response.distance / ( response.velocity * 1500 );
            setSpeed( speedNewValue );
         }
      });
   };
   const handleStop = () => {
      fetchCarDrive( id, 'stopped' );
      setRaceStatus( 'stopped' );
   };
   const toggleSelect = () => dispatch( setSelectedCar( selectedCar?.id == id ? undefined : carData ) );
   const handleDelete = () => dispatch( deleteCar( id ) );
   const handleFinish = () => setRaceStatus( 'finished' );
   
   return {
      handleStart,
      handleStop,
      toggleSelect,
      handleDelete,
      raceStatus,
      animationStyle,
      handleFinish,
   }
}

export default UseGarageTableRow;