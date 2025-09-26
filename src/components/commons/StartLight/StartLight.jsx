import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './StartLight.module.scss';

function StartLight({ raceState }) {
   const [lightState, setLightState] = useState(0);

   useEffect(() => {
      let setLightStateTimer;

      if (raceState) {
         if (lightState < 4) {
            setLightStateTimer = setTimeout(() => {
               setLightState(lightState + 1);
            }, 1000);
         }
      } else {
         setLightState(0);
      }

      return () => clearTimeout(setLightStateTimer);
   }, [raceState, lightState]);

   return (
      <div className={styles.startLight}>
         <div
            className={classNames(styles.light, {
               [styles.red]: lightState >= 1 && lightState < 4,
               [styles.green]: lightState === 4,
            })}
         />
         <div
            className={classNames(styles.light, {
               [styles.red]: lightState >= 2 && lightState < 4,
               [styles.green]: lightState === 4,
            })}
         />
         <div
            className={classNames(styles.light, {
               [styles.red]: lightState >= 3 && lightState < 4,
               [styles.green]: lightState === 4,
            })}
         />
      </div>
   );
}

export default StartLight;
