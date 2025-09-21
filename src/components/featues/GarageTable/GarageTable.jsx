import React, { useState } from 'react';

import FinishLine from 'components/commons/FinishLine/FinishLine';
import GarageTableRow from 'components/commons/GarageTableRow/GarageTableRow';
import Pagination from 'components/commons/Pagination/Pagination';

import styles from './GarageTable.module.scss';

function GarageTable({ list }) {
   const [ pageNo, setPageNo ] = useState( 1 ); 

   const handlePageChange = No => setPageNo( No );
   const visibleitemsCount = 7;

   return(
      <div className = { styles.garageTable }>
         <div className = { styles.track }>
            <span className = { styles.startLine }>START</span>
            <FinishLine />
            {
               list
               .slice(( pageNo - 1 ) * visibleitemsCount, pageNo * visibleitemsCount )
               .map( car => <GarageTableRow key = { car.id + " " + Math.random() } carData = { car } />)
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