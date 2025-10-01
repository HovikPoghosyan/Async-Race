import { Middleware } from '@reduxjs/toolkit';
import { setRace } from 'store/modules/garageListReducer';
import { setWinner } from 'store/modules/winnersListReducer';

const raceMiddleware: Middleware = (store) => (next) => (action) => {
   if (setRace.match(action)) {
      const { payload } = action;

      if (payload !== 'finished') {
         next(setWinner(undefined));
      }
   }

   return next(action);
};

export default raceMiddleware;
