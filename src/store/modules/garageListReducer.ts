import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomCarName, getRandomColor } from 'CONSTANTS/CarData';
import { fetchGarageList, fetchNewCar, fetchDeleteCar, fetchUpdateCar } from 'CONSTANTS/Axios';
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
}

const initialState: GarageListState = {
   garageList: [],
   selectedCar: undefined,
   loading: false,
   race: 'stopped',
   winnerPopup: false,
};

const generateCars = createAsyncThunk<void, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'garageList/generateCars',
   async (count, { dispatch }) => {
      for (let index = 0; index < count; index++) {
         dispatch(
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
      const data = await fetchNewCar(carData);
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      return data;
   }
);

const updateCar = createAsyncThunk<Car, Car, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'list/updateCar',
   async (carData, { rejectWithValue, dispatch, getState }) => {
      const data = await fetchUpdateCar(carData);
      const { winnersList } = getState().winnersList;
      const carInWinnersList = winnersList.find((winner: Winner) => winner.id === carData.id);
      if (data?.isFailed) return rejectWithValue({ isFailed: true });
      if (carInWinnersList) dispatch(updateWinner({ ...carInWinnersList, ...carData })).unwrap();

      return data;
   }
);

const deleteCar = createAsyncThunk<number, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'garageList/deleteCar',
   async (id, { rejectWithValue, getState, dispatch }) => {
      const data = await fetchDeleteCar(id);
      const { winnersList } = getState().winnersList;
      const carIsWinner = winnersList.some((winner: Winner) => winner.id === id);
      console.log('carIsWinner: ', carIsWinner);
      if (carIsWinner) {
         dispatch(deleteWinner(id));
      }
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      return data;
   }
);

const getGarageLists = createAsyncThunk<Car[], void, { state: RootState; rejectValue: { isFailed: boolean, errorMessage: string } }>(
   'garageList/getGarageLists',
   async (props, { rejectWithValue }) => {
      const data = await fetchGarageList();
      if (data.isFailed) return rejectWithValue({ isFailed: true, errorMessage: data.errors.message });

      return data;
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
         .addCase(addNewCar.fulfilled, (state, { meta }) => {
            state.garageList.push({
               ...meta.arg,
               id: state.garageList.length ? state.garageList[state.garageList.length - 1].id + 1 : 1,
            });
         })
         .addCase(updateCar.fulfilled, (state, { meta }) => {
            state.garageList = state.garageList.map((car) => (car.id === meta.arg.id ? { ...car, ...meta.arg } : car));
         })
         .addCase(deleteCar.fulfilled, (state, { meta }) => {
            state.garageList = state.garageList.filter((car) => car.id !== meta.arg);
         })
         .addCase(getGarageLists.pending, (state) => {
            state.loading = true;
         })
         .addCase(getGarageLists.fulfilled, (state, { payload }) => {
            state.garageList = payload;
            state.loading = false;
         })
         .addCase(getGarageLists.rejected, (state) => {
            state.loading = false;
         });
   },
});

export const { setSelectedCar, closeWinnerPopup, setRace, openWinnerPopup } = garageListReducer.actions;
export { generateCars, addNewCar, updateCar, deleteCar, getGarageLists };
export default garageListReducer.reducer;
