import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleGarageRaceStatusesHistory } from 'Storages/SessionStorage';
import { fetchCarEngineMode, fetchCarDrive } from 'CONSTANTS/Axios';
import {
   deleteCar,
   newWinner,
   setSelectedCar,
   updateWinner,
} from 'store/modules/listReducer';

import styles from './GarageTableRow.module.scss';

function UseGarageTableRow(carData) {
   const dispatch = useDispatch();
   const { id } = carData;
   const { selectedCar, race, winner, winnersList } = useSelector(
      (store) => store.list
   );
   const [time, setTime] = useState(0);
   const [raceStatus, setRaceStatus] = useState(
      handleGarageRaceStatusesHistory('getItem', { key: id }) || 'stopped'
   );
   const animationStyle = {
      // animation: `${ styles.moveToEnd } ${ time }s linear 4.2s forwards`,
      // animationPlayState: raceStatus == 'brokenEngine' ? "paused" : "running",

      animationName: styles.moveToEnd,
      animationDuration: `${time}s`,
      animationTimingFunction: 'linear',
      animationDelay: '4.2s',
      animationFillMode: 'forwards',
      animationPlayState: raceStatus === 'brokenEngine' ? 'paused' : 'running',
   };
   useEffect(() => {
      handleGarageRaceStatusesHistory('update', {
         key: id,
         newValue: raceStatus != 'stopped' ? 'finished' : 'stopped',
      });
   }, [raceStatus]);

   const handleStart = () => {
      setRaceStatus('stopped');
      setTimeout(() => {
         setRaceStatus('started');
         if (selectedCar?.id == id) dispatch(setSelectedCar(undefined));
         fetchCarEngineMode(id, 'started').then((response) => {
            if (!response?.isFailed) {
               const raceTime = response.distance / (response.velocity * 500);
               setTimeout(
                  () =>
                     fetchCarDrive(id).then((response) => {
                        if (response?.isFailed && response.status == 500) {
                           setRaceStatus('brokenEngine');
                        }
                     }),
                  4200
               );

               setTime(raceTime);
            } else setRaceStatus('stopped');
         });
      }, 0);
   };
   const handleStop = () => {
      fetchCarEngineMode(id, 'stopped');
      setRaceStatus('stopped');
   };
   const toggleSelect = () =>
      dispatch(setSelectedCar(selectedCar?.id == id ? undefined : carData));
   const handleDelete = () => dispatch(deleteCar(id));
   const handleFinish = () => {
      if (race && !winner) {
         const lastWin = winnersList.find((car) => car.id === id);
         if (lastWin)
            dispatch(
               updateWinner({
                  ...lastWin,
                  time: Math.min(lastWin.time, (time * 5).toFixed(3)),
               })
            );
         else dispatch(newWinner({ ...carData, time: (time * 5).toFixed(3) }));
      }
      setRaceStatus('finished');
   };

   useEffect(() => {
      if (race != 'finished') race ? handleStart() : handleStop();
   }, [race]);

   return {
      handleStart,
      handleStop,
      toggleSelect,
      handleDelete,
      raceStatus,
      animationStyle,
      handleFinish,
   };
}

export default UseGarageTableRow;
