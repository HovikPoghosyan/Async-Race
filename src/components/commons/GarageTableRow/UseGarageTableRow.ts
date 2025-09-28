import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';

import { handleGarageRaceStatusesHistory } from 'Storages/SessionStorage';
import { fetchCarEngineMode, fetchCarDrive } from 'CONSTANTS/Axios';
import { deleteCar, newWinner, setSelectedCar, updateWinner } from 'store/modules/listReducer';

import styles from './GarageTableRow.module.scss';

interface CarData {
   id: number;
   name: string;
   color: string;
}

type RaceStatus = 'stopped' | 'started' | 'finished' | 'brokenEngine';

interface UseGarageTableRowReturn {
   handleStart: () => void;
   handleStop: () => void;
   toggleSelect: () => void;
   handleDelete: () => void;
   raceStatus: RaceStatus;
   animationStyle: CSSProperties;
   handleFinish: () => void;
}

const getAnimationStyle = (raceStatus: string, time: number): CSSProperties => ({
   animationName: styles.moveToEnd,
   animationDuration: `${time}s`,
   animationTimingFunction: 'linear',
   animationDelay: '4.2s',
   animationFillMode: 'forwards',
   animationPlayState: raceStatus === 'brokenEngine' ? 'paused' : 'running',
});

function UseGarageTableRow(carData: CarData): UseGarageTableRowReturn {
   const dispatch = useAppDispatch();
   const { id } = carData;
   const { selectedCar, race, winner, winnersList } = useAppSelector((store) => store.list);
   const [time, setTime] = useState<number>(0);
   const [raceStatus, setRaceStatus] = useState<RaceStatus>(
      (handleGarageRaceStatusesHistory('getItem', { key: id }) as RaceStatus) || 'stopped'
   );
   const animationStyle: CSSProperties = getAnimationStyle(raceStatus, time);
   useEffect(() => {
      if (raceStatus !== 'started') {
         handleGarageRaceStatusesHistory('update', { key: id, newValue: raceStatus });
      }
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
   const toggleSelect = () => dispatch(setSelectedCar(selectedCar?.id == id ? undefined : carData));
   const handleDelete = () => dispatch(deleteCar(id));
   const handleFinish = () => {
      if (race && !winner) {
         const lastWin = winnersList.find((car) => car.id === id);
         const timeNewValue = Number((time * 5).toFixed(3));
         if (lastWin)
            dispatch(
               updateWinner({
                  ...lastWin,
                  time: Math.min(lastWin.time, timeNewValue),
               })
            );
         else dispatch(newWinner({ ...carData, time: timeNewValue }));
      }
      setRaceStatus('finished');
   };

   useEffect(() => {
      if (race && race != 'finished') race === 'started' ? handleStart() : handleStop();
   }, [race]);

   return { handleStart, handleStop, toggleSelect, handleDelete, raceStatus, animationStyle, handleFinish };
}

export default UseGarageTableRow;
