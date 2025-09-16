import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/layouts/Header/Header';

import styles from './App.module.scss';

function App () {
   return(
      <div className = "wrapper">
         <Header />
         <Outlet />
      </div>
   )
}

export default App;