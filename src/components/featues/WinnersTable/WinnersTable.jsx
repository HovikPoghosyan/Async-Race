import React, { useState } from 'react';

import WinnersTableRow from 'components/commons/WinnersTableRow/WinnersTableRow';
import Pagination from 'components/commons/Pagination/Pagination';

import styles from './WinnersTable.module.scss';

function WinnersTable({ list }) {
   const [ pageNo, setPageNo ] = useState( 1 ); 

   const handlePageChange = No => setPageNo( No );
   const visibleitemsCount = 10;
   return(
      <>
         <table className = { styles.table } >
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
               {
                  list
                  .slice(( pageNo - 1 ) * visibleitemsCount, pageNo * visibleitemsCount )
                  .map( car => <WinnersTableRow key = { car?.id } carData = { car } /> )

               }
            </tbody>
         </table>
         {
            list.length >= visibleitemsCount 
               ?  <Pagination 
                     count = { list.length } 
                     pageNo = { pageNo }
                     changePage = { ( No ) => handlePageChange( No ) }
                     visibleitemsCount = { visibleitemsCount }
                  /> 
               :  null
         }
      </>

   )
}

export default WinnersTable;