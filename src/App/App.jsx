import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from 'components/layouts/Header/Header';

import { getGarageLists } from 'store/modules/listReducer';

import styles from './App.module.scss';

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getGarageLists()).then((response) => {
         const { payload } = response;
         if (payload && !payload?.isFail) {
            sessionStorage.setItem(
               'garageRaceStatusesHistory',
               JSON.stringify(
                  Object.fromEntries(payload.map((car) => [car.id, 'stopped']))
               )
            );
            sessionStorage.setItem(
               'tablesPagesHistory',
               JSON.stringify({
                  garageTable: 1,
                  winnersTable: 1,
               })
            );
         }
      });
   }, []);

   return (
      <div className="wrapper">
         <div className="container">
            <Header />
            <Outlet />
         </div>
      </div>
   );
}

export default App;
