import React from 'react';

import FinishLine from 'components/commons/FinishLine/FinishLine';
import CarTrack from 'components/featues/CarTrack/CarTrack';
import Pagination from 'components/commons/Pagination/Pagination';

import styles from './GarageTable.module.scss';

function GarageTable() {

   return(
      <div className = { styles.garageTable }>
         <div className = { styles.track }>
            <span className = { styles.startLine }>START</span>
            <FinishLine />
            <CarTrack />
            <CarTrack />
            <CarTrack />
            <CarTrack />
            <CarTrack />
            <CarTrack />
            <CarTrack />
         </div>
         <Pagination />
      </div>
   )
}

export default GarageTable;