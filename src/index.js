import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import routesConfig from 'RoutesConfig/RoutesConfig';

import App from './App/App';

import './index.css';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
   <React.StrictMode>
      <RouterProvider router = { routesConfig() }/>
   </React.StrictMode>
);

reportWebVitals();