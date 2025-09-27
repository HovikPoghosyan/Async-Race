import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import routesConfig from 'RoutesConfig/RoutesConfig';

import configureReduxStore from 'store/configureReduxStore';
import reportWebVitals from './reportWebVitals';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureReduxStore();
root.render(
   <Provider store={store}>
      <RouterProvider router={routesConfig()} />
   </Provider>
);

reportWebVitals();
