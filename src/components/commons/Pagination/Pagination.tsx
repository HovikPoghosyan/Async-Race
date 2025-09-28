import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { setRace } from 'store/modules/listReducer';

import Button from 'components/commons/Button/Button';

import styles from './Pagination.module.scss';

interface PaginationProps {
   count: number;
   pageNo: number;
   changePage: (page: number) => void;
   visibleitemsCount: number;
}

function Pagination({ count, pageNo, changePage, visibleitemsCount }: PaginationProps) {
   const dispatch = useAppDispatch();
   const { pathname } = useLocation();
   const race = useAppSelector((store) => store.list.race);
   return (
      <div className={styles.pagination}>
         <Button
            name={
               <span>
                  <FontAwesomeIcon icon={faArrowLeft} /> Previous Page
               </span>
            }
            isDisable={ pageNo === 1 || ( pathname === '/Async-Race/garage' ? race == 'started' : false ) }
            functionality={() => {
               changePage(pageNo - 1);
               if( pathname === '/Async-Race/garage' ) dispatch( setRace('stopped'))
            }}
         />
         <p>{`Page No.${pageNo}`}</p>
         <Button
            name={
               <span>
                  Next Page <FontAwesomeIcon icon={faArrowRight} />
               </span>
            }
            isDisable={ pageNo == Math.ceil(count / visibleitemsCount) ||( pathname == '/Async-Race/garage' ? race == 'started' : false )}
            functionality={() => {
               changePage(pageNo + 1);
               if( pathname === '/Async-Race/garage' ) dispatch( setRace('stopped'))
            }}
         />
      </div>
   );
}

export default Pagination;
