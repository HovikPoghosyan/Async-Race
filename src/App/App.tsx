import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks/hooks';
import NotFoundMessage from 'components/commons/NotFoundMessage/NotFoundMessage';

import Header from 'components/layouts/Header/Header';

import { getGarageLists } from 'store/modules/garageListReducer';
import { getWinnersLists } from 'store/modules/winnersListReducer';

import styles from './App.module.scss';

function App() {
   const dispatch = useAppDispatch();
   const [errorMessage, setErrorMessage] = useState<string>('');

   useEffect(() => {
      dispatch(getGarageLists()).then((response: any) => {
         const { payload } = response;
         if (payload && !payload?.errorMessage) {
            sessionStorage.setItem('tablesPagesHistory', JSON.stringify({ garageTable: 1, winnersTable: 1 }));
            dispatch(getWinnersLists());
         } else setErrorMessage(payload.errorMessage);
      });
   }, []);
   return (
      <div className="wrapper">
         <div className="container">
            <Header />
            {errorMessage ? <NotFoundMessage message={errorMessage} /> : <Outlet />}
         </div>
      </div>
   );
}

export default App;
