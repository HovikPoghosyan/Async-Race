import React, { useState, useEffect, FC } from 'react';

import handleTablesPagesHistory from 'Storages/SessionStorage';

import WinnersTableRow from 'components/commons/WinnersTableRow/WinnersTableRow';
import Pagination from 'components/commons/Pagination/Pagination';
import WinnerTableHead from 'components/commons/WinnerTableHead/WinnerTableHead';

import { Winner } from 'store/modules/listReducer';
import styles from './WinnersTable.module.scss';

interface WinnersTableProps {
   list: Winner[];
}

function WinnersTable({ list }: WinnersTableProps) {
   const pageInHistory = handleTablesPagesHistory('getItem', { key: 'winnersTable' });
   const visibleitemsCount = 10;
   const maxPageCount = Math.ceil(list.length / visibleitemsCount);
   const [pageNo, setPageNo] = useState(pageInHistory <= maxPageCount ? pageInHistory : maxPageCount);

   useEffect(() => {
      handleTablesPagesHistory('update', { key: 'winnersTable', newValue: pageNo });
   }, [pageNo]);
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
            <Pagination
               count={list.length}
               pageNo={pageNo}
               changePage={(No: number) => handlePageChange(No)}
               visibleitemsCount={visibleitemsCount}
            />
         ) : null}
      </>
   );
}

export default WinnersTable;
