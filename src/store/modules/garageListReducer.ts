import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomCarName, getRandomColor } from 'CONSTANTS/CarData';
import { fetchGarageListPage, fetchNewCar, fetchDeleteCar, fetchUpdateCar } from 'CONSTANTS/Axios';
import type { RootState } from 'store/configureReduxStore';
import { deleteWinner, Winner, updateWinner } from './winnersListReducer';

export interface Car {
   id: number;
   name: string;
   color: string;
}

export interface CarData {
   name: string;
   color: string;
}

interface GarageListState {
   garageList: Car[];
   selectedCar?: Car;
   loading: boolean;
   race: string;
   winnerPopup: boolean;
   count: number;
}

const initialState: GarageListState = {
   garageList: [],
   selectedCar: undefined,
   loading: true,
   race: 'stopped',
   winnerPopup: false,
   count: 0,
};

const generateCars = createAsyncThunk<void, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'garageList/generateCars',
   async (count, { dispatch }) => {
      for (let index = 0; index < count; index++) {
         await dispatch(
            addNewCar({
               name: getRandomCarName(),
               color: getRandomColor(),
            })
         );
      }
   }
);

const addNewCar = createAsyncThunk<CarData, CarData, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'garageList/addNewCar',
   async (carData, { rejectWithValue }) => {
      const response = await fetchNewCar(carData);
      if (response?.isFailed) return rejectWithValue({ isFailed: true });

      return response;
   }
);

const updateCar = createAsyncThunk<Car, Car, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/updateCar',
   async (carData, { rejectWithValue, dispatch, getState }) => {
      const response = await fetchUpdateCar(carData);
      const { winnersList } = getState().winnersList;
      const carInWinnersList = winnersList.find((winner: Winner) => winner.id === carData.id);
      if (response?.isFailed) return rejectWithValue({ isFailed: true });
      if (carInWinnersList) dispatch(updateWinner({ ...carInWinnersList, ...carData })).unwrap();

      return response;
   }
);

const deleteCar = createAsyncThunk<number, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'garageList/deleteCar',
   async (id, { rejectWithValue, getState, dispatch }) => {
      const response = await fetchDeleteCar(id);
      const { winnersList } = getState().winnersList;
      const carIsWinner = winnersList.some((winner: Winner) => winner.id === id);
      if (carIsWinner) {
         dispatch(deleteWinner(id));
      }
      if (response.isFailed) return rejectWithValue({ isFailed: true });

      return response;
   }
);

const getGarageListPage = createAsyncThunk<any, number, { state: RootState; rejectValue: { isFailed: boolean; errorMessage: string } }>(
   'garageList/getGarageList',
   async (pageNo, { rejectWithValue }) => {
      console.log('getGarageList');
      const response = await fetchGarageListPage(pageNo);
      if (response.isFailed) return rejectWithValue({ isFailed: true, errorMessage: response.errors.message });

      return response;
   }
);

const garageListReducer = createSlice({
   name: 'garageList',
   initialState,
   reducers: {
      setSelectedCar(state, { payload }) {
         state.selectedCar = payload;
      },
      setRace(state, { payload }) {
         state.race = payload;
      },
      closeWinnerPopup(state) {
         state.winnerPopup = false;
      },
      openWinnerPopup(state) {
         state.winnerPopup = true;
      },
   },
   extraReducers: (builder) => {
      builder
         // .addCase(generateCars.pending, (state ) => { state.loading = true })
         // .addCase(generateCars.fulfilled, (state, { meta }) => { state.loading = false })
         .addCase(addNewCar.fulfilled, (state, { meta }) => {
            state.count += 1;
         })
         .addCase(updateCar.fulfilled, (state, { meta }) => {
            state.garageList = state.garageList.map((car) => (car.id === meta.arg.id ? { ...car, ...meta.arg } : car));
         })
         .addCase(deleteCar.fulfilled, (state, { meta }) => {
            state.garageList = state.garageList.filter((car) => car.id !== meta.arg);
            state.selectedCar = state.selectedCar?.id == meta.arg ? undefined : state.selectedCar;
            state.count -= 1;
         })
         .addCase(getGarageListPage.pending, (state) => {
            state.loading = true;
         })
         .addCase(getGarageListPage.fulfilled, (state, { payload }) => {
            const list = [...state.garageList, ...payload.data].sort((carOne, carSecond) => carOne.id - carSecond.id);
            state.garageList = Array.from(new Map(list.map((item) => [item.id, item])).values());
            state.count = Number(payload.headers['x-total-count']);
            state.loading = false;
         })
         .addCase(getGarageListPage.rejected, (state) => {
            state.loading = false;
         });
   },
});

export const { setSelectedCar, closeWinnerPopup, setRace, openWinnerPopup } = garageListReducer.actions;
export { generateCars, addNewCar, updateCar, deleteCar, getGarageListPage };
export default garageListReducer.reducer;
