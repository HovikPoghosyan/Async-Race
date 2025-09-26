import React from 'react';

import styles from './FinishLine.module.scss';

function FinishLine() {
   return (
      <div className={styles.finishLine}>
         <div className={styles.background}></div>
         <div className={styles.background}></div>
         <div className={styles.background}></div>
         <div className={styles.background}></div>
      </div>
   );
}

export default FinishLine;
