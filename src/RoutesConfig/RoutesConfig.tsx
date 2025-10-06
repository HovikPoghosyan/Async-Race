import React from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

import App from 'App/App';
import Garage from 'pages/Garage/Garage';
import Winners from 'pages/Winners/Winners';
import NotFound from 'pages/NotFound/NotFound';

function routesConfig(): ReturnType<typeof createBrowserRouter> {
   const routes: RouteObject[] = [
      {
         path: '/Async-Race',
         element: <App />,
         children: [
            {
               index: true,
               element: <Navigate replace to="garage" />,
            },
            {
               path: 'garage',
               element: <Garage />,
            },
            {
               path: 'winners',
               element: <Winners />,
            },
            {
               path: '*',
               element: <NotFound />,
            },
         ],
      },
      {
         path: '*',
         element: <NotFound />
      }
   ];

   return createBrowserRouter(routes);
}

export default routesConfig;
