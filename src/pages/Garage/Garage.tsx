import React from 'react';

import { useAppSelector } from 'store/hooks/hooks';

import GarageControlPanel from 'components/featues/GarageControlPanel/GarageControlPanel';
import GarageTable from 'components/featues/GarageTable/GarageTable';
import LoadingCircle from 'components/featues/LoadingCircle/LoadingCircle';
import NotFoundMessage from 'components/commons/NotFoundMessage/NotFoundMessage';
import WinnerBanner from 'components/commons/WinnerBanner/WinnerBanner';

import styles from './Garage.module.scss';

function Garage() {
   const { garageList, loading, count } = useAppSelector((store) => store.garageList);
   return (
      <main>
         <GarageControlPanel />
         {loading ? (
            <LoadingCircle />
         ) : count !== 0 ? (
            <GarageTable list={garageList} />
         ) : (
            <NotFoundMessage message="No cars yet. Add one to get started!" />
         )}
         {loading ? null : <WinnerBanner />}
      </main>
   );
}

export default Garage;
