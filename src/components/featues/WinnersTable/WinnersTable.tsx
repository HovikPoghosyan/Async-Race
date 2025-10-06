import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';

import handleTablesPagesHistory from 'Storages/SessionStorage';

import { getWinnersListPage, Winner } from 'store/modules/winnersListReducer';

import WinnersTableRow from 'components/commons/WinnersTableRow/WinnersTableRow';
import Pagination from 'components/commons/Pagination/Pagination';
import WinnerTableHead from 'components/commons/WinnerTableHead/WinnerTableHead';

import styles from './WinnersTable.module.scss';

interface WinnersTableProps {
   list: Winner[];
}

function WinnersTable({ list }: WinnersTableProps) {
   const dispatch = useAppDispatch();
   const count = useAppSelector((store) => store.winnersList.count);
   const pageInHistory = handleTablesPagesHistory('getItem', { key: 'winnersTable' });
   const visibleitemsCount = 10;
   const maxPageCount = Math.ceil(list.length / visibleitemsCount);
   const [pageNo, setPageNo] = useState(pageInHistory <= maxPageCount ? pageInHistory : maxPageCount);
   useEffect(() => {
      handleTablesPagesHistory('update', { key: 'winnersTable', newValue: pageNo });
      if (list.length <= (pageNo - 1) * visibleitemsCount) dispatch(getWinnersListPage(pageNo));
      if (count < pageNo * visibleitemsCount && list.length != count) dispatch(getWinnersListPage(pageNo));
      if (count >= pageNo * visibleitemsCount && list.length < pageNo * visibleitemsCount) dispatch(getWinnersListPage(pageNo));
   }, [list, pageNo, count]);
   const handlePageChange = (No: number) => setPageNo(No);
   return (
      <>
         <WinnerTableHead />
         <table className={styles.table}>
            <thead>
               <tr>
                  <th>No</th>
                  <th>Car</th>
                  <th>Name</th>
                  <th>Wins</th>
                  <th>Best Time</th>
               </tr>
            </thead>
            <tbody>
               {list.slice((pageNo - 1) * visibleitemsCount, pageNo * visibleitemsCount).map((car: Winner) => (
                  <WinnersTableRow key={car?.id} carData={car} />
               ))}
            </tbody>
         </table>
         {list.length >= visibleitemsCount ? (
            <Pagination count={count} pageNo={pageNo} changePage={(No: number) => handlePageChange(No)} visibleitemsCount={visibleitemsCount} />
         ) : null}
      </>
   );
}

export default WinnersTable;
