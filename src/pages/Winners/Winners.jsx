import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

import WinnersTable from 'components/featues/WinnersTable/WinnersTable';
import LoadingCircle from 'components/featues/LoadingCircle/LoadingCircle';
import NotFoundMessage from 'components/commons/NotFoundMessage/NotFoundMessage';

import styles from './Winners.module.scss';

function Winners() {
   const { winnersList, loading } = useSelector( state => state.list );

   return(
      <main>
         <div className = { styles.winnersHead }>
            <FontAwesomeIcon size = "2x" color = "rgb(72, 191, 238)" icon = { faTrophy } />
            <h2 className = { styles.title }>&nbsp;WINNERS&nbsp;</h2>
            <FontAwesomeIcon size = "2x" color = "#a001ea" icon = { faTrophy } />
         </div>
         {
            loading 
               ?  <LoadingCircle />
               :  winnersList[0] 
                  ?  <WinnersTable list = { winnersList }/>
                  :  <NotFoundMessage message = "No winners at the moment. Keep watching!"/>
         }
      </main>
   )
}

export default Winners;