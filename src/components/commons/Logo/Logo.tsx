import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import styles from './Logo.module.scss';

function Logo() {
   return (
      <div className={styles.logo}>
         <FontAwesomeIcon color="#48bfeeff" flip="horizontal" icon={faFlagCheckered} />
         <h1 className={styles.logo}>&nbsp;ASYNC RACE&nbsp;</h1>
         <FontAwesomeIcon color="#a001ea" icon={faFlagCheckered} />
      </div>
   );
}

export default Logo;
