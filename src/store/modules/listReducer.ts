/* eslint-disable */
/* prettier-ignore */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRandomCarName, getRandomColor } from 'CONSTANTS/CarData';

import {
   fetchGarageList,
   fetchWinnersList,
   fetchNewCar,
   fetchDeleteCar,
   fetchUpdateCar,
   fetchNewWinner,
   fetchUpdateWinner,
   fetchDeleteWinner,
} from 'CONSTANTS/Axios';

import type { RootState, AppDispatch } from 'store/configureReduxStore';
import { stat } from 'fs';

export interface Car {
   id: number;
   name: string;
   color: string;
}

export interface CarData {
   name: string;
   color: string;
}

export interface Winner {
   id: number;
   wins: number;
   time: number;
   name: string;
   color: string;
}

interface ListState {
   garageList: Car[];
   winnersList: Winner[];
   selectedCar?: Car;
   loading: boolean;
   race?: string;
   winner?: Partial<Winner>;
   winnerPopup: boolean;
   winnersSortBy?: string;
   winnersSortDirection?: string;
}

const generateCars = createAsyncThunk<void, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/generateCars',
   async (count, { rejectWithValue, dispatch }) => {
      for (let index = 0; index < count; index++) {
         const data = await fetchNewCar({
            name: getRandomCarName(),
            color: getRandomColor(),
         });

         if (data.isFailed) return rejectWithValue({ isFailed: true });
      }

      dispatch(getGarageLists()).unwrap();
   }
);

const addNewCar = createAsyncThunk<CarData, CarData, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/addNewCar',
   async (carData, { rejectWithValue, dispatch }) => {
      const data = await fetchNewCar(carData);
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      dispatch(getGarageLists()).unwrap();

      return data;
   }
);

const newWinner = createAsyncThunk<Winner, Partial<Winner>, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/newWinner',
   async (carData, { rejectWithValue, dispatch }) => {
      const data = await fetchNewWinner(carData);
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      dispatch(getWinnersLists()).unwrap();

      return data;
   }
);

const updateWinner = createAsyncThunk<Winner, Winner, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/updateWinner',
   async (carData, { rejectWithValue, dispatch }) => {
      const data = await fetchUpdateWinner(carData);
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      dispatch(getWinnersLists()).unwrap();

      return data;
   }
);

const updateCar = createAsyncThunk<Car, Car, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/updateCar',
   async (carData, { rejectWithValue, dispatch }) => {
      const data = await fetchUpdateCar(carData);
      if (data?.isFailed) return rejectWithValue({ isFailed: true });

      dispatch(getGarageLists()).unwrap();

      return data;
   }
);

const deleteCar = createAsyncThunk<number, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/deleteCar',
   async (id, { rejectWithValue, dispatch }) => {
      const data = await fetchDeleteCar(id);
      fetchDeleteWinner(id);
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      dispatch(getGarageLists()).unwrap();

      return data;
   }
);

const getGarageLists = createAsyncThunk<Car[], void, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/getGarageLists',
   async (props, { rejectWithValue, dispatch }) => {
      const data = await fetchGarageList();
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      dispatch(getWinnersLists()).unwrap();

      return data;
   }
);

const getWinnersLists = createAsyncThunk<Winner[], void, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/getWinnersLists',
   async (props, { rejectWithValue }) => {
      const data = await fetchWinnersList();
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      return data;
   }
);

const initialState: ListState = {
   garageList: [],
   winnersList: [],
   selectedCar: undefined,
   loading: false,
   race: undefined,
   winner: undefined,
   winnerPopup: false,
   winnersSortBy: undefined,
   winnersSortDirection: undefined,
};

const appSlice = createSlice({
   name: 'list',
   initialState,
   reducers: {
      setSelectedCar(state, { payload }) {
         state.selectedCar = payload;
      },
      setRace(state, { payload }) {
         if (payload != 'finished') state.winner = undefined;
         state.race = payload;
      },
      closeWinnerPopup(state) {
         state.winnerPopup = false;
      },
      setWinnersList( state, { payload }) {
         state.winnersList = payload;
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(deleteCar.pending, (state, { meta }) => {
            const selectedId = state.selectedCar?.id;
            const deletingId = meta.arg;
            if (selectedId !== undefined && selectedId === deletingId) {
               state.selectedCar = undefined;
            }
            state.loading = true;
         })
         .addCase(generateCars.pending, (state) => {
            state.loading = true;
         })
         .addCase(newWinner.pending, (state, { meta }) => {
            state.race = 'finished';
            state.winner = meta.arg;
            state.winnerPopup = true;
         })
         .addCase(updateWinner.pending, (state, { meta }) => {
            state.race = 'finished';
            state.winner = meta.arg;
            state.winnerPopup = true;
         })
         .addCase(addNewCar.pending, (state) => {
            state.loading = true;
         })
         .addCase(updateCar.pending, (state) => {
            state.loading = true;
         })
         .addCase(getGarageLists.pending, (state) => {
            state.loading = true;
         })
         .addCase(getGarageLists.fulfilled, (state, { payload }) => {
            state.garageList = payload;
         })
         .addCase(getGarageLists.rejected, (state, { payload }) => {
            state.loading = false;
         })
         .addCase(getWinnersLists.fulfilled, (state, { payload }) => {
            const restyleList: Winner[] = payload
               .map((winner: Partial<Winner>) => {
                  const car = state.garageList.find((current) => current.id === winner.id);
                  if (car?.name && car?.color && winner?.id && winner?.time && winner?.wins)
                     return {
                        ...winner,
                        name: car.name,
                        color: car.color,
                     };
               })
               .filter((winner): winner is Winner => winner !== undefined);
            state.winnersList = restyleList;
            state.loading = false;
         })
         .addCase(getWinnersLists.rejected, (state) => {
            state.loading = false;
         });
   },
});

export const { setRace, setSelectedCar, closeWinnerPopup, setWinnersList } = appSlice.actions;
export { getGarageLists, getWinnersLists, generateCars, addNewCar, updateCar, deleteCar, newWinner, updateWinner };
export default appSlice.reducer;
