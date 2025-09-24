import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from 'App/App';

import Garage from 'pages/Garage/Garage';
import Winners from 'pages/Winners/Winners';

function routesConfig() {

   return createBrowserRouter([

      {
         path: '/Async-Race',
         element: <App />,
         children: [
            {
               index: true,
               element: <Navigate replace to = "garage" />,
            },
            {
               path: 'garage',
               element: <Garage />,
            },
            {
               path: 'winners',
               element: <Winners />,
            },
         ],
      },
   ]);
}

export default routesConfig;