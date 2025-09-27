import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { handleTablesPagesHistory } from 'Storages/SessionStorage';
import { setRace } from 'store/modules/listReducer';

import FinishLine from 'components/commons/FinishLine/FinishLine';
import GarageTableRow from 'components/commons/GarageTableRow/GarageTableRow';
import Pagination from 'components/commons/Pagination/Pagination';

import styles from './GarageTable.module.scss';

function GarageTable({ list }) {
   const dispatch = useDispatch();
   const pageInHistory = handleTablesPagesHistory('getItem', {
      key: 'garageTable',
   });
   const visibleitemsCount = 7;
   const maxPageCount = Math.ceil(list.length / visibleitemsCount);
   const [pageNo, setPageNo] = useState(
      pageInHistory <= maxPageCount ? pageInHistory : maxPageCount
   );
   const tableRef = useRef(null);
   const [startLineStyle, setStartLineStyle] = useState({});
   const handlePageChange = (No) => setPageNo(No);

   useEffect(() => {
      handleTablesPagesHistory('update', {
         key: 'garageTable',
         newValue: pageNo,
      });
      dispatch(setRace(false));
   }, [pageNo]);

   useEffect(() => {
      setStartLineStyle({
         fontSize: `${Math.min((tableRef?.current?.offsetHeight / 100) * 10, 24)}px`,
         letterSpacing: `${Math.min((tableRef?.current?.offsetHeight / 100) * 2, 10)}px`,
      });
   }, []);

   return (
      <div className={styles.garageTable} ref={tableRef}>
         <div className={styles.track}>
            <span className={styles.startLine} style={startLineStyle}>
               START
            </span>
            <FinishLine />
            {list
               .slice(
                  (pageNo - 1) * visibleitemsCount,
                  pageNo * visibleitemsCount
               )
               .map((car) => (
                  <GarageTableRow key={car.id} carData={car} />
               ))}
         </div>
         {list.length > visibleitemsCount ? (
            <Pagination
               count={list.length}
               pageNo={pageNo}
               changePage={(No) => handlePageChange(No)}
               visibleitemsCount={visibleitemsCount}
            />
         ) : null}
      </div>
   );
}

export default GarageTable;
