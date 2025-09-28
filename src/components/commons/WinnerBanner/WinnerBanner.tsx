import React, { MouseEvent, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch } from 'store/hooks/hooks';

import { closeWinnerPopup } from 'store/modules/listReducer';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

import styles from './WinnerBanner.module.scss';

function WinnerBanner() {
   const dispatch = useAppDispatch();
   const { winner, winnerPopup } = useAppSelector((store) => store.list);
   const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLButtonElement;
      if (target.className == styles.winnerBanner) dispatch(closeWinnerPopup());
   };
   const closingTimerRef = useRef<number | null>(null);

   useEffect(() => {
      if (winnerPopup) {
         closingTimerRef.current = window.setTimeout(() => dispatch(closeWinnerPopup()), 5000);
      } else if (closingTimerRef.current !== null) clearTimeout(closingTimerRef.current);
   }, [winnerPopup]);

   if (!winnerPopup) return null;
   return (
      <button className={styles.winnerBanner} onClick={handleClose}>
         <h4 className={styles.title}>
            <FontAwesomeIcon size="1x" color="rgb(72, 191, 238)" icon={faTrophy} />
            &nbsp;{`The ${winner?.name} is a new Winner!`}&nbsp;
            <FontAwesomeIcon size="1x" color="#a001ea" icon={faTrophy} />
         </h4>
      </button>
   );
}

export default WinnerBanner;
