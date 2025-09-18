import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/layouts/Header/Header';

import styles from './App.module.scss';

function App () {
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