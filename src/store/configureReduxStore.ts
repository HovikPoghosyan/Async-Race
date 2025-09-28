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


type AppStore = ReturnType<typeof configureReduxStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];


export { type RootState, type AppDispatch };
export default configureReduxStore;