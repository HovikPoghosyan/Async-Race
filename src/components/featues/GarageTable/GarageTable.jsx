import React, { useEffect, useState } from 'react';

import { handleTablesPagesHistory } from 'Storages/SessionStorage';

import FinishLine from 'components/commons/FinishLine/FinishLine';
import GarageTableRow from 'components/commons/GarageTableRow/GarageTableRow';
import Pagination from 'components/commons/Pagination/Pagination';

import styles from './GarageTable.module.scss';

function GarageTable({ list }) {
   const pageInHistory = handleTablesPagesHistory( 'getItem', { key: 'garageTable' } );
   const visibleitemsCount = 7;
   const maxPageCount = Math.ceil( list.length / visibleitemsCount );
   const [ pageNo, setPageNo ] = useState( pageInHistory <= maxPageCount ? pageInHistory : maxPageCount ); 

   const handlePageChange = No => setPageNo( No );

   useEffect( () => {
      handleTablesPagesHistory( 'update', { key: 'garageTable', newValue: pageNo } )
   }, [ pageNo ]);

   return(
      <div className = { styles.garageTable }>
         <div className = { styles.track }>
            <span className = { styles.startLine }>START</span>
            <FinishLine />
            {
               list
               .slice(( pageNo - 1 ) * visibleitemsCount, pageNo * visibleitemsCount )
               .map( car => <GarageTableRow key = { car.id } carData = { car } />)
            }
         </div>
         {
            list.length > visibleitemsCount
               ?  <Pagination 
                     count = { list.length } 
                     pageNo = { pageNo }
                     changePage = { ( No ) => handlePageChange( No ) }
                     visibleitemsCount = { visibleitemsCount }
                  />
               : null
         }
      </div>
   )
}

export default GarageTable;