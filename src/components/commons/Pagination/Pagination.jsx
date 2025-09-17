import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faArrowRight,
   faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import Button from 'components/commons/Button/Button';

import styles from './Pagination.module.scss';

function Pagination() {

   return(
      <div className = { styles.pagination }>
         <Button name = { <span><FontAwesomeIcon icon = { faArrowLeft } /> Previous Page</span> }/>
         <p>Page No.13</p>
         <Button name = { <span>Next Page <FontAwesomeIcon icon = { faArrowRight } /></span> }/>
      </div>
   )
}

export default Pagination;