import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from 'components/layouts/Header/Header';

import { getGarageLists, getWinnersLists } from 'store/modules/listReducer';
import { fetchDeleteCar, fetchNewCar } from 'CONSTANTS/Axios';

import styles from './App.module.scss';

function App () {
   const dispatch = useDispatch();
   
   useEffect(() => {
      dispatch( getGarageLists() );
   }, [])
   
   return(
      <div className = "wrapper">
         <div className = "container">
            <Header />
            <Outlet />
         </div>
      </div>
   )
}

export default App;