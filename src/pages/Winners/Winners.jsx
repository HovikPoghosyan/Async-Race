import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

import styles from './Winners.module.scss';

import WinnersTable from 'components/featues/WinnersTable/WinnersTable';

function Winners() {

   return(
      <main>
         <div className = { styles.winnersHead }>
            <FontAwesomeIcon size = "2x" color = "rgb(72, 191, 238)" icon = { faTrophy } />
            <h2 className = { styles.title }>&nbsp;WINNERS&nbsp;</h2>
            <FontAwesomeIcon size = "2x" color = "#a001ea" icon = { faTrophy } />
         </div>
         <WinnersTable />
      </main>
   )
}

export default Winners;