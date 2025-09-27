import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import GarageControlPanel from 'components/featues/GarageControlPanel/GarageControlPanel';
import GarageTable from 'components/featues/GarageTable/GarageTable';
import LoadingCircle from 'components/featues/LoadingCircle/LoadingCircle';
import NotFoundMessage from 'components/commons/NotFoundMessage/NotFoundMessage';

import styles from './Garage.module.scss';

function Garage() {
   const { garageList, loading } = useSelector((state) => state.list);

   return (
      <main>
         <GarageControlPanel />
         {loading ? (
            <LoadingCircle />
         ) : garageList.length ? (
            <GarageTable list={garageList} />
         ) : (
            <NotFoundMessage message="No cars yet. Add one to get started!" />
         )}
      </main>
   );
}

export default Garage;
