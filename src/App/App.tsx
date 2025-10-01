import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks/hooks';

import Header from 'components/layouts/Header/Header';

import { getGarageLists, getWinnersLists } from 'store/modules/listReducer';

import styles from './App.module.scss';

function App() {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(getGarageLists()).then((response: any) => {
         const { payload } = response;
         if (payload && !payload?.isFail) {
            sessionStorage.setItem('tablesPagesHistory', JSON.stringify({ garageTable: 1, winnersTable: 1 }));
            dispatch(getWinnersLists());
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
