import React, { FC } from 'react';

import styles from './FinishLine.module.scss';

function FinishLine() {
   return (
      <div className={styles.finishLine}>
         <div className={styles.background} />
         <div className={styles.background} />
         <div className={styles.background} />
         <div className={styles.background} />
      </div>
   );
}

export default FinishLine;
