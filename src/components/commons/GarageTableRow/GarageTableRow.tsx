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
import GarageTableRowCntrolBlock from '../GarageTableRowCntrolBlock/GarageTableRowCntrolBlock';

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
   const { handleStart, handleStop, toggleSelect, handleDelete, raceStatus, animationStyle, handleFinish } =
      UseGarageTableRow(carData);

   return (
      <div className={styles.carTrack}>
         <h4 className={styles.carName}>
            {raceStatus == 'brokenEngine' ? <FontAwesomeIcon icon={faTriangleExclamation} color="#dc3545" /> : null}
            {` ${name}`}
         </h4>
         <StartLight raceState={raceStatus === 'started'} />
         <GarageTableRowCntrolBlock
            raceStatus={raceStatus}
            selectedCarId={selectedCar?.id}
            carId={id}
            handleStart={handleStart}
            handleStop={handleStop}
            toggleSelect={toggleSelect}
            handleDelete={handleDelete}
         />
         <CarIcon
            handleAnimationEnd={handleFinish}
            className={classNames(
               styles.car,
               { [styles.racingAnimation]: raceStatus == 'started' },
               { [styles.inTheEnd]: raceStatus == 'finished' }
            )}
            style={raceStatus == 'started' || raceStatus == 'brokenEngine' ? animationStyle : undefined}
            width={100}
            height={42}
            fill={color}
         />
      </div>
   );
}

export default GarageTableRow;
