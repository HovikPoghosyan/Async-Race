import { configureStore } from '@reduxjs/toolkit';
import garageListReducer from './modules/garageListReducer';
import winnersListReducer from './modules/winnersListReducer';
import raceMiddleware from './middlewares/raceMiddleware';

function configureReduxStore() {
   const store = configureStore({
      reducer: {
         garageList: garageListReducer,
         winnersList: winnersListReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(raceMiddleware),
   });

   return store;
}

type AppStore = ReturnType<typeof configureReduxStore>;
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export { type RootState, type AppDispatch };
export default configureReduxStore;
