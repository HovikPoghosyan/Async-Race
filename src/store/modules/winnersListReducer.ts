import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWinnersListPage, fetchNewWinner, fetchUpdateWinner, fetchDeleteWinner, fetchCarData } from 'CONSTANTS/Axios';
import type { RootState } from 'store/configureReduxStore';
import { Car, openWinnerPopup, setRace } from './garageListReducer';

export interface Winner {
   id: number;
   wins: number;
   time: number;
   name: string;
   color: string;
}

interface WinnersState {
   winnersList: Winner[];
   winner?: Partial<Winner>;
   loading: boolean;
   count: number;
}

const initialState: WinnersState = {
   winnersList: [],
   winner: undefined,
   loading: false,
   count: 0,
};

const newWinner = createAsyncThunk<Winner, Partial<Winner>, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winnersList/newWinner',
   async (carData, { rejectWithValue, dispatch }) => {
      const response = await fetchNewWinner(carData);
      if (response.isFailed) return rejectWithValue({ isFailed: true });
      dispatch(setRace('finished'));
      dispatch(openWinnerPopup());

      return response;
   }
);

const updateWinner = createAsyncThunk<Winner, Winner, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winnersList/updateWinner',
   async (carData, { rejectWithValue }) => {
      const response = await fetchUpdateWinner(carData);
      if (response.isFailed) return rejectWithValue({ isFailed: true });

      return response;
   }
);

const deleteWinner = createAsyncThunk<number, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winnersList/deleteWinner',
   async (id, { rejectWithValue }) => {
      const response = await fetchDeleteWinner(id);
      if (response.isFailed) return rejectWithValue({ isFailed: true });

      return response;
   }
);

const getWinnersListPage = createAsyncThunk<any, number, { state: RootState; rejectValue: { isFailed: boolean; errorMessage: string } }>(
   'winnersList/getWinnersListPage',
   async (pageNo, { rejectWithValue, getState }) => {
      const response = await fetchWinnersListPage(pageNo);

      if (response.isFailed) {
         return rejectWithValue({
            isFailed: true,
            errorMessage: response?.errors?.message || 'Failed to fetch winners',
         });
      }
      const { garageList } = getState().garageList;
      const data = await Promise.all(
         response.data.map(async (winner: Winner) => {
            const car = garageList.find((c: Car) => c.id === winner.id);
            if (car) {
               return { ...winner, name: car.name, color: car.color };
            }

            const fetchedCar = await fetchCarData(winner.id).then((response) => response[0]);

            return {
               ...winner,
               name: fetchedCar?.name || '',
               color: fetchedCar?.color || '#ccc',
            };
         })
      );

      return {
         data,
         headers: response.headers,
      };
   }
);

const winnersListReducer = createSlice({
   name: 'winnersList',
   initialState,
   reducers: {
      setWinnersList(state, { payload }) {
         state.winnersList = payload;
      },
      setWinner(state, { payload }) {
         state.winner = payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(newWinner.pending, (state, { meta }) => {
            state.winner = meta.arg;
         })
         .addCase(newWinner.fulfilled, (state, { meta }) => {
            state.winnersList.push({
               id: meta.arg.id!,
               time: meta.arg.time!,
               wins: 1,
               name: meta.arg.name || 'car',
               color: meta.arg.color || '#ccc',
            });
            state.count += 1;
         })
         .addCase(updateWinner.fulfilled, (state, { meta }) => {
            state.winnersList = state.winnersList.map((winner) => (winner.id === meta.arg.id ? { ...winner, ...meta.arg } : winner));
            state.winner = meta.arg;
         })
         .addCase(deleteWinner.fulfilled, (state, { meta }) => {
            state.winnersList = state.winnersList.filter((winner) => winner.id !== meta.arg);
            state.count -= 1;
         })
         .addCase(getWinnersListPage.pending, (state) => {
            state.loading = true;
         })
         .addCase(getWinnersListPage.fulfilled, (state, { payload }) => {
            const list = [...state.winnersList, ...payload.data].sort((carOne, carSecond) => carOne.id - carSecond.id);
            state.winnersList = Array.from(new Map(list.map((item) => [item.id, item])).values());
            state.count = Number(payload.headers['x-total-count']);
            state.loading = false;
         })
         .addCase(getWinnersListPage.rejected, (state) => {
            state.loading = false;
         });
   },
});

export const { setWinnersList, setWinner } = winnersListReducer.actions;
export { updateWinner, getWinnersListPage, deleteWinner, newWinner };
export default winnersListReducer.reducer;
