import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faStop,
   faTriangleExclamation,
   faTrash,
   faRefresh,
   faSliders,
} from '@fortawesome/free-solid-svg-icons';

import Button from 'components/commons/Button/Button';
import CarIcon from 'assets/icons/CarIcon/CarIcon';
import StartLight from '../StartLight/StartLight';

import UseGarageTableRow from './UseGarageTableRow';

import styles from './GarageTableRow.module.scss';


interface GarageTableRowProps {
   carData: {
      id: number;
      name: string;
      color: string;
   };
}


function GarageTableRow({ carData }: GarageTableRowProps) {
   const { id, name, color } = carData;
   const selectedCar = useAppSelector((store) => store.list.selectedCar);
   const {
      handleStart,
      handleStop,
      toggleSelect,
      handleDelete,
      raceStatus,
      animationStyle,
      handleFinish,
   } = UseGarageTableRow(carData);

   return (
      <div className={styles.carTrack}>
         <h4 className={styles.carName}>
            {
               raceStatus == 'brokenEngine'
                  ?  <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        color="#dc3545"
                     />
                  : null
            }
            {` ${name}`}
         </h4>
         <StartLight raceState={raceStatus === 'started'} />
         <div className={styles.controlBlock}>
            <Button
               isDisable={raceStatus != 'stopped'}
               style={styles.controlBlockBtn}
               name={<FontAwesomeIcon icon={faPlay} color="#28a745" />}
               functionality={handleStart}
            />
            <Button
               isDisable={raceStatus == 'stopped'}
               style={styles.controlBlockBtn}
               name={
                  <FontAwesomeIcon
                     icon={
                        raceStatus == 'finished' || raceStatus == 'brokenEngine'
                           ? faRefresh
                           : faStop
                     }
                     color="#ffc107"
                  />
               }
               functionality={handleStop}
            />
            <Button
               isDisable={raceStatus == 'started'}
               style={styles.controlBlockBtn}
               name={
                  <FontAwesomeIcon
                     icon={faSliders}
                     color={selectedCar?.id == id ? '#48bfeeff' : '#ccc'}
                  />
               }
               functionality={toggleSelect}
            />
            <Button
               isDisable={raceStatus == 'started'}
               style={styles.controlBlockBtn}
               name={<FontAwesomeIcon icon={faTrash} color="#dc3545" />}
               functionality={handleDelete}
            />
         </div>
         <CarIcon
            handleAnimationEnd={handleFinish}
            className={classNames(
               styles.car,
               { [styles.racingAnimation]: raceStatus == 'started' },
               { [styles.inTheEnd]: raceStatus == 'finished' }
            )}
            style={
               raceStatus == 'started' || raceStatus == 'brokenEngine'
                  ? animationStyle
                  : undefined
            }
            width={100}
            height={42}
            fill={color}
         />
      </div>
   );
}

export default GarageTableRow;
