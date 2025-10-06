import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';

import handleTablesPagesHistory from 'Storages/SessionStorage';
import { Car, setRace, getGarageListPage } from 'store/modules/garageListReducer';

import FinishLine from 'components/commons/FinishLine/FinishLine';
import GarageTableRow from 'components/commons/GarageTableRow/GarageTableRow';
import Pagination from 'components/commons/Pagination/Pagination';

import styles from './GarageTable.module.scss';

interface GarageTableProps {
   list: Car[];
}

const getStartLineStyle = (height: number) => ({
   fontSize: `${Math.min((height / 150) * 10, 24)}px`,
   letterSpacing: `${Math.min((height / 150) * 2, 10)}px`,
});

function GarageTable({ list }: GarageTableProps) {
   const dispatch = useAppDispatch();
   const count = useAppSelector((store) => store.garageList.count);
   const pageInHistory = handleTablesPagesHistory('getItem', { key: 'garageTable' });
   const visibleitemsCount = 7;
   const maxPageCount = Math.ceil(list.length / visibleitemsCount);
   const [pageNo, setPageNo] = useState<number>(pageInHistory <= maxPageCount ? pageInHistory : maxPageCount);
   const tableRef = useRef<HTMLDivElement>(null);
   const [startLineStyle, setStartLineStyle] = useState<CSSProperties>({});
   const handlePageChange = (No: number) => setPageNo(No);
   useEffect(() => {
      handleTablesPagesHistory('update', { key: 'garageTable', newValue: pageNo });
      dispatch(setRace('stopped'));
   }, [pageNo]);
   useEffect(() => {
      const tableHeight = tableRef?.current?.offsetHeight ?? 500;
      setStartLineStyle(getStartLineStyle(tableHeight));
      if (list.length <= (pageNo - 1) * visibleitemsCount) dispatch(getGarageListPage(pageNo));
      if (count < pageNo * visibleitemsCount && list.length != count) dispatch(getGarageListPage(pageNo));
      if (count >= pageNo * visibleitemsCount && list.length < pageNo * visibleitemsCount) dispatch(getGarageListPage(pageNo));
   }, [list, pageNo, count]);
   return (
      <div className={styles.garageTable} ref={tableRef}>
         <div className={styles.track}>
            <span className={styles.startLine} style={startLineStyle}>
               START
            </span>
            <FinishLine />
            {list.slice((pageNo - 1) * visibleitemsCount, pageNo * visibleitemsCount).map((car) => (
               <GarageTableRow key={car.id} carData={car} />
            ))}
         </div>
         {count > visibleitemsCount ? (
            <Pagination count={count} pageNo={pageNo} changePage={(No) => handlePageChange(No)} visibleitemsCount={visibleitemsCount} />
         ) : null}
      </div>
   );
}

export default GarageTable;
