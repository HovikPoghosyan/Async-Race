// /* eslint-disable */
// /* prettier-ignore */
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { getRandomCarName, getRandomColor } from 'CONSTANTS/CarData';

// import {
//    fetchGarageList,
//    fetchWinnersList,
//    fetchNewCar,
//    fetchDeleteCar,
//    fetchUpdateCar,
//    fetchNewWinner,
//    fetchUpdateWinner,
//    fetchDeleteWinner,
// } from 'CONSTANTS/Axios';

// import type { RootState } from 'store/configureReduxStore';

// export interface Car {
//    id: number;
//    name: string;
//    color: string;
// }

// export interface CarData {
//    name: string;
//    color: string;
// }

// export interface Winner {
//    id: number;
//    wins: number;
//    time: number;
//    name: string;
//    color: string;
// }

// interface ListState {
//    garageList: Car[];
//    winnersList: Winner[];
//    selectedCar?: Car;
//    loading: boolean;
//    race?: string;
//    winner?: Partial<Winner>;
//    winnerPopup: boolean;
//    winnersSortBy?: string;
//    winnersSortDirection?: string;
// }

// const generateCars = createAsyncThunk<void, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
//    'list/generateCars',
//    async (count, { dispatch }) => {
//       for (let index = 0; index < count; index++) {
//          dispatch(
//             addNewCar({
//                name: getRandomCarName(),
//                color: getRandomColor(),
//             })
//          );
//       }
//    }
// );

// const addNewCar = createAsyncThunk<CarData, CarData, { state: RootState; rejectValue: { isFailed: boolean } }>(
//    'list/addNewCar',
//    async (carData, { rejectWithValue }) => {
//       const data = await fetchNewCar(carData);
//       if (data.isFailed) return rejectWithValue({ isFailed: true });

//       return data;
//    }
// );

// const newWinner = createAsyncThunk<Winner, Partial<Winner>, { state: RootState; rejectValue: { isFailed: boolean } }>(
//    'list/newWinner',
//    async (carData, { rejectWithValue }) => {
//       const data = await fetchNewWinner(carData);
//       if (data.isFailed) return rejectWithValue({ isFailed: true });

//       return data;
//    }
// );

// const updateWinner = createAsyncThunk<Winner, Winner, { state: RootState; rejectValue: { isFailed: boolean } }>(
//    'list/updateWinner',
//    async (carData, { rejectWithValue }) => {
//       const data = await fetchUpdateWinner(carData);
//       if (data.isFailed) return rejectWithValue({ isFailed: true });

//       return data;
//    }
// );

// const updateCar = createAsyncThunk<Car, Car, { state: RootState; rejectValue: { isFailed: boolean } }>(
//    'list/updateCar',
//    async (carData, { rejectWithValue, dispatch, getState }) => {
//       const data = await fetchUpdateCar(carData);
//       const { winnersList } = getState().list;
//       const carInWinnersList = winnersList.find((w) => w.id === carData.id);
//       if (data?.isFailed) return rejectWithValue({ isFailed: true });
//       if (!!carInWinnersList) dispatch(updateWinner(carInWinnersList)).unwrap();

//       return data;
//    }
// );

// const deleteCar = createAsyncThunk<number, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
//    'list/deleteCar',
//    async (id, { rejectWithValue, getState }) => {
//       const data = await fetchDeleteCar(id);
//       const { winnersList } = getState().list;
//       const carIsWinner = winnersList.some((winner) => winner.id === id);
//       if (carIsWinner) fetchDeleteWinner(id);
//       if (data.isFailed) return rejectWithValue({ isFailed: true });

//       return data;
//    }
// );

// const getGarageLists = createAsyncThunk<Car[], void, { state: RootState; rejectValue: { isFailed: boolean } }>(
//    'list/getGarageLists',
//    async (props, { rejectWithValue }) => {
//       const data = await fetchGarageList();
//       if (data.isFailed) return rejectWithValue({ isFailed: true });

//       return data;
//    }
// );

// const getWinnersLists = createAsyncThunk<Winner[], void, { state: RootState; rejectValue: { isFailed: boolean } }>(
//    'list/getWinnersLists',
//    async (props, { rejectWithValue }) => {
//       const data = await fetchWinnersList();
//       if (data.isFailed) return rejectWithValue({ isFailed: true });

//       return data;
//    }
// );

// const initialState: ListState = {
//    garageList: [],
//    winnersList: [],
//    selectedCar: undefined,
//    loading: false,
//    race: undefined,
//    winner: undefined,
//    winnerPopup: false,
//    winnersSortBy: undefined,
//    winnersSortDirection: undefined,
// };

// const appSlice = createSlice({
//    name: 'list',
//    initialState,
//    reducers: {
//       setSelectedCar(state, { payload }) {
//          state.selectedCar = payload;
//       },
//       setRace(state, { payload }) {
//          if (payload != 'finished') state.winner = undefined;
//          state.race = payload;
//       },
//       closeWinnerPopup(state) {
//          state.winnerPopup = false;
//       },
//       setWinnersList(state, { payload }) {
//          state.winnersList = payload;
//       },
//    },
//    extraReducers: (builder) => {
//       builder
//          .addCase(deleteCar.pending, (state, { meta }) => {
//             const selectedId = state.selectedCar?.id;
//             const deletingId = meta.arg;
//             if (selectedId !== undefined && selectedId === deletingId) {
//                state.selectedCar = undefined;
//             }
//          })
//          .addCase(deleteCar.fulfilled, (state, { meta }) => {
//             state.garageList = state.garageList.filter((car) => car.id !== meta.arg);
//             state.winnersList = state.winnersList.filter((car) => car.id !== meta.arg);
//          })
//          .addCase(newWinner.pending, (state, { meta }) => {
//             state.race = 'finished';
//             state.winner = meta.arg;
//             state.winnerPopup = true;
//          })
//          .addCase(newWinner.fulfilled, (state, { meta }) => {
//             state.winnersList = [
//                ...state.winnersList,
//                {
//                   name: meta.arg.name || 'name',
//                   color: meta.arg.color || '#ccc',
//                   id: meta.arg.id || 3,
//                   time: meta.arg.time || 33,
//                   wins: 1,
//                },
//             ];
//          })
//          .addCase(updateWinner.pending, (state) => {
//             state.race = 'finished';
//          })
//          .addCase(updateWinner.fulfilled, (state, { meta }) => {
//             state.winnersList = state.winnersList.map((winner) =>
//                winner.id === meta.arg.id
//                   ? {
//                        ...winner,
//                        wins: meta.arg.wins,
//                        time: meta.arg.time,
//                     }
//                   : winner
//             );
//          })
//          .addCase(addNewCar.fulfilled, (state, { meta }) => {
//             state.garageList = [
//                ...state.garageList,
//                {
//                   name: meta.arg.name,
//                   color: meta.arg.color,
//                   id: state.garageList.length ? state.garageList[state.garageList.length - 1].id + 1 : 1,
//                },
//             ];
//          })
//          .addCase(updateCar.fulfilled, (state, { meta }) => {
//             state.garageList = state.garageList.map((car) =>
//                car.id === meta.arg.id
//                   ? {
//                        color: meta.arg.color,
//                        name: meta.arg.name,
//                        id: meta.arg.id,
//                     }
//                   : car
//             );
//          })
//          .addCase(getGarageLists.pending, (state) => {
//             state.loading = true;
//          })
//          .addCase(getGarageLists.fulfilled, (state, { payload }) => {
//             state.garageList = payload;
//             state.loading = false;
//          })
//          .addCase(getGarageLists.rejected, (state, { payload }) => {
//             state.loading = false;
//          })
//          .addCase(getWinnersLists.fulfilled, (state, { payload }) => {
//             const restyleList: Winner[] = payload
//                .map((winner: Partial<Winner>) => {
//                   const car = state.garageList.find((current) => current.id === winner.id);
//                   if (car?.name && car?.color && winner?.id && winner?.time && winner?.wins)
//                      return {
//                         ...winner,
//                         name: car.name,
//                         color: car.color,
//                      };
//                })
//                .filter((winner): winner is Winner => winner !== undefined);
//             state.winnersList = restyleList;
//             state.loading = false;
//          })
//          .addCase(getWinnersLists.rejected, (state) => {
//             state.loading = false;
//          });
//    },
// });

// export const { setRace, setSelectedCar, closeWinnerPopup, setWinnersList } = appSlice.actions;
// export { getGarageLists, getWinnersLists, generateCars, addNewCar, updateCar, deleteCar, newWinner, updateWinner };
// export default appSlice.reducer;

/* eslint-disable */
/* prettier-ignore */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWinnersList, fetchNewWinner, fetchUpdateWinner, fetchDeleteWinner } from 'CONSTANTS/Axios';
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
}

const initialState: WinnersState = {
   winnersList: [],
   winner: undefined,
   loading: false,
};

const newWinner = createAsyncThunk<Winner, Partial<Winner>, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winnersList/newWinner',
   async (carData, { rejectWithValue, dispatch }) => {
      const data = await fetchNewWinner(carData);
      if (data.isFailed) return rejectWithValue({ isFailed: true });
      dispatch(setRace('finished'));
      dispatch(openWinnerPopup());

      return data;
   }
);

const updateWinner = createAsyncThunk<Winner, Winner, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winnersList/updateWinner',
   async (carData, { rejectWithValue }) => {
      const data = await fetchUpdateWinner(carData);
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      return data;
   }
);

const deleteWinner = createAsyncThunk<number, number, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winnersList/deleteWinner',
   async (id, { rejectWithValue }) => {
      const data = await fetchDeleteWinner(id);
      if (data.isFailed) return rejectWithValue({ isFailed: true });

      return data;
   }
);

const getWinnersLists = createAsyncThunk<Winner[], void, { state: RootState; rejectValue: { isFailed: boolean } }>(
   'winnersList/getWinnersLists',
   async (props, { rejectWithValue, getState }) => {
      const data = await fetchWinnersList();
      if (data.isFailed) return rejectWithValue({ isFailed: true });
      const { garageList } = getState().garageList;

      return data.map((winner: Winner) => {
         const car = garageList.find((car: Car) => car.id === winner.id);
         return { ...winner, name: car?.name || 'unknown', color: car?.color || '#ccc' };
      });
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
         })
         .addCase(updateWinner.fulfilled, (state, { meta }) => {
            state.winnersList = state.winnersList.map((winner) => (winner.id === meta.arg.id ? { ...winner, ...meta.arg } : winner));
         })
         .addCase(deleteWinner.fulfilled, (state, { meta }) => {
            console.log('meta delet arg winner: ', meta.arg);
            state.winnersList = state.winnersList.filter((winner) => winner.id !== meta.arg);
         })
         .addCase(getWinnersLists.pending, (state) => {
            state.loading = true;
         })
         .addCase(getWinnersLists.fulfilled, (state, { payload }) => {
            state.winnersList = payload;
            state.loading = false;
         })
         .addCase(getWinnersLists.rejected, (state) => {
            state.loading = false;
         });
   },
});

export const { setWinnersList, setWinner } = winnersListReducer.actions;
export { updateWinner, getWinnersLists, deleteWinner, newWinner };
export default winnersListReducer.reducer;
