import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';

import { fetchCarEngineMode, fetchCarDrive } from 'CONSTANTS/Axios';
import { deleteCar, setSelectedCar } from 'store/modules/garageListReducer';
import { newWinner, updateWinner, Winner } from 'store/modules/winnersListReducer';
import { AppDispatch } from 'store/configureReduxStore';

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

const startCar = (
   id: number,
   selectedCar: CarData | undefined,
   dispatch: AppDispatch,
   setRaceStatus: React.Dispatch<React.SetStateAction<RaceStatus>>,
   setTime: React.Dispatch<React.SetStateAction<number>>
) => {
   setRaceStatus('stopped');
   setTimeout(() => {
      setRaceStatus('started');
      if (selectedCar?.id === id) dispatch(setSelectedCar(undefined));

      fetchCarEngineMode(id, 'started').then((response) => {
         if (!response?.isFailed) {
            const raceTime = response.distance / (response.velocity * 500);
            setTimeout(() => {
               fetchCarDrive(id).then((res) => {
                  if (res?.isFailed && res.status === 500) {
                     setRaceStatus('brokenEngine');
                  }
               });
            }, 4200);
            setTime(raceTime);
         } else setRaceStatus('stopped');
      });
   }, 0);
};

const stopCar = (id: number, setRaceStatus: React.Dispatch<React.SetStateAction<RaceStatus>>) => {
   fetchCarEngineMode(id, 'stopped');
   setRaceStatus('stopped');
};

function UseGarageTableRow(carData: CarData): UseGarageTableRowReturn {
   const dispatch = useAppDispatch();
   const { id } = carData;
   const { selectedCar, race } = useAppSelector((store) => store.garageList);
   const { winnersList, winner } = useAppSelector((store) => store.winnersList);
   const [time, setTime] = useState<number>(0);
   const [raceStatus, setRaceStatus] = useState<RaceStatus>('stopped');
   const animationStyle: CSSProperties = getAnimationStyle(raceStatus, time);

   const handleStart = () => startCar(id, selectedCar, dispatch, setRaceStatus, setTime);
   const handleStop = () => stopCar(id, setRaceStatus);
   const handleFinish = () => {
      if (race && !winner) {
         const lastWin = winnersList.find((winner: Winner) => winner.id === id);
         const timeNewValue = Number((time * 5).toFixed(3));
         if (lastWin)
            dispatch(
               updateWinner({
                  ...lastWin,
                  wins: lastWin.wins + 1,
                  time: Math.min(lastWin.time, timeNewValue),
               })
            );
         else dispatch(newWinner({ ...carData, time: timeNewValue }));
      }
      setRaceStatus('finished');
   };
   const toggleSelect = () => dispatch(setSelectedCar(selectedCar?.id == id ? undefined : carData));
   const handleDelete = () => dispatch(deleteCar(id));
   useEffect(() => {
      if (race && race != 'finished' && race !== raceStatus) race === 'started' ? handleStart() : handleStop();
   }, [race]);

   return { handleStart, handleStop, toggleSelect, handleDelete, raceStatus, animationStyle, handleFinish };
}

export default UseGarageTableRow;
