import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';
import { setWinnersList } from 'store/modules/listReducer';
import sortWinnersList, { SortBy, SortDirection } from './SortWinnersList';
import ToggleButton from '../ToggleButton/ToggleButton';

import styles from './WinnerTableHead.module.scss';

function WinnerTableHead() {
   const dispatch = useAppDispatch();
   const winnersList = useAppSelector((store) => store.list.winnersList);
   const [sortBy, setSortBy] = useState<SortBy>('By Time');
   const [sortDirection, setSortDirection] = useState<SortDirection>('Increasing');
   useEffect(() => {
      if (sortBy && sortDirection) dispatch(setWinnersList(sortWinnersList(winnersList, sortBy, sortDirection)));
   }, [sortBy, sortDirection, dispatch]);

   return (
      <div className={styles.winnerTableHead}>
         <ToggleButton
            name="sortBy"
            valueOne="By Wins"
            valueTwo="By Time"
            startValue="By Time"
            onToggle={(newValue: string | null) => {
               if (newValue !== null) {
                  setSortBy(newValue as SortBy);
               }
            }}
            uncheckedValue={null}
         />
         <ToggleButton
            name="sortDirection"
            valueOne="Increasing"
            valueTwo="Decreasing"
            startValue="Increasing"
            onToggle={(newValue: string | null) => {
               if (newValue !== null) {
                  setSortDirection(newValue as SortDirection);
               }
            }}
            uncheckedValue={null}
         />
      </div>
   );
}

export default WinnerTableHead;
