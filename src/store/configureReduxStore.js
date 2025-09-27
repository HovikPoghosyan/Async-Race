import { configureStore } from '@reduxjs/toolkit';

import listReducer from 'store/modules/listReducer';

function configureReduxStore() {
   const store = configureStore({
      reducer: {
         list: listReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
   });

   return store;
}

export default configureReduxStore;
