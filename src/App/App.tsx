import React, { useEffect, useState } from 'react';
import { Outlet, useLocation,useMatches } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks/hooks';
import NotFoundMessage from 'components/commons/NotFoundMessage/NotFoundMessage';

import Header from 'components/layouts/Header/Header';

import { getGarageListPage } from 'store/modules/garageListReducer';
import { getWinnersListPage } from 'store/modules/winnersListReducer';

import styles from './App.module.scss';

function App() {
   const dispatch = useAppDispatch();
   const [errorMessage, setErrorMessage] = useState<string>('');
   const matches = useMatches();

   useEffect(() => {
      dispatch(getGarageListPage(1)).then((response: any) => {
         const { payload } = response;
         if (payload && !payload?.errorMessage ) {
            sessionStorage.setItem('tablesPagesHistory', JSON.stringify({ garageTable: 1, winnersTable: 1 }));
            dispatch(getWinnersListPage(1));
         } else if (!matches[1]?.params['*']) setErrorMessage(payload.errorMessage);
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
