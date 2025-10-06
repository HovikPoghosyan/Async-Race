import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';
import { getWinnersListPage } from 'store/modules/winnersListReducer';

import WinnersTable from 'components/featues/WinnersTable/WinnersTable';
import LoadingCircle from 'components/featues/LoadingCircle/LoadingCircle';
import NotFoundMessage from 'components/commons/NotFoundMessage/NotFoundMessage';

import styles from './Winners.module.scss';

function Winners() {
   const dispatch = useAppDispatch();
   const { winnersList, loading, count } = useAppSelector((state) => state.winnersList);

   useEffect(() => {
      if (count == 0) dispatch(getWinnersListPage(1));
   }, []);
   return (
      <main>
         <div className={styles.winnersHead}>
            <FontAwesomeIcon size="2x" color="rgb(72, 191, 238)" icon={faTrophy} />
            <h2 className={styles.title}>&nbsp;WINNERS&nbsp;</h2>
            <FontAwesomeIcon size="2x" color="#a001ea" icon={faTrophy} />
         </div>
         {loading ? (
            <LoadingCircle />
         ) : count !== 0 ? (
            <WinnersTable list={winnersList} />
         ) : (
            <NotFoundMessage message="No winners at the moment. Keep watching!" />
         )}
      </main>
   );
}

export default Winners;
