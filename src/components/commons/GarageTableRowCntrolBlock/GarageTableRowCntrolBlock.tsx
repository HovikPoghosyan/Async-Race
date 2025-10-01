import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faStop,
   faTrash,
   faRefresh,
   faSliders,
} from '@fortawesome/free-solid-svg-icons';

import Button from 'components/commons/Button/Button';
import styles from './GarageTableRowCntrolBlock.module.scss';

interface GarageTableRowCntrolBlockProps {
   raceStatus: string;
   selectedCarId?: number;
   carId: number;
   handleStart: () => void;
   handleStop: () => void;
   toggleSelect: () => void;
   handleDelete: () => void;
}

function GarageTableRowCntrolBlock({
   raceStatus,
   selectedCarId,
   carId,
   handleStart,
   handleStop,
   toggleSelect,
   handleDelete,
}: GarageTableRowCntrolBlockProps) {
   return (
      <div className={styles.controlBlock}>
         {[
            { icon: faPlay, color: '#28a745', disabled: raceStatus !== 'stopped', onClick: handleStart },
            {
               icon: raceStatus === 'finished' || raceStatus === 'brokenEngine' ? faRefresh : faStop,
               color: '#ffc107',
               disabled: raceStatus === 'stopped',
               onClick: handleStop,
            },
            {
               icon: faSliders,
               color: selectedCarId === carId ? '#48bfeeff' : '#ccc',
               disabled: raceStatus === 'started',
               onClick: toggleSelect,
            },
            { icon: faTrash, color: '#dc3545', disabled: raceStatus === 'started', onClick: handleDelete },
         ].map((btn, i) => (
            <Button
               key={`BtnNo${btn.icon}_${Math.random()}`}
               isDisable={btn.disabled}
               style={styles.controlBlockBtn}
               name={<FontAwesomeIcon icon={btn.icon} color={btn.color} />}
               functionality={btn.onClick}
            />
         ))}
      </div>
   );
}

export default GarageTableRowCntrolBlock;
