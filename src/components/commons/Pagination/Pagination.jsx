import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faArrowRight,
   faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import Button from 'components/commons/Button/Button';

import styles from './Pagination.module.scss';

function Pagination({ count, pageNo, changePage, visibleitemsCount }) {
   
   return(
      <div className = { styles.pagination }>
         <Button 
            name = { <span><FontAwesomeIcon icon = { faArrowLeft } /> Previous Page</span> }
            isDisable = { pageNo == 1 }
            functionality = { () => changePage( pageNo - 1 ) }
         />
         <p>{ `Page No.${ pageNo }` }</p>
         <Button 
            name = { <span>Next Page <FontAwesomeIcon icon = { faArrowRight } /></span> }
            isDisable = { pageNo == Math.ceil( count / visibleitemsCount )}
            functionality = { () => changePage( pageNo + 1 ) }
         />
      </div>
   )
}

export default Pagination;