import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRandomCarName, getRandomColor } from 'CONSTANTS/CarData'

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

const generateCars = createAsyncThunk(
   'list/generateCars',
   async ( count, { rejectWithValue, dispatch }) => {
      for ( let index = 0; index < count; index++ ) {
         const data = await fetchNewCar({
            name: getRandomCarName(),
            color: getRandomColor(),
         });

         if ( data.isFailed ) return rejectWithValue();
      }
      
      dispatch( getGarageLists() ).unwrap();

      return;
   }
);

const addNewCar = createAsyncThunk(
   'list/addNewCar',
   async ( carData, { rejectWithValue, dispatch }) => {
      const data = await fetchNewCar( carData );
      if ( data.isFailed ) return rejectWithValue();
      
      dispatch( getGarageLists() ).unwrap();

      return data;
   }
);

const newWinner = createAsyncThunk(
   'list/newWinner',
   async ( carData, { rejectWithValue, dispatch }) => {
      const data = await fetchNewWinner( carData );
      if ( data.isFailed ) return rejectWithValue();
      
      dispatch( getWinnersLists() ).unwrap();

      return data;
   }
);

const updateWinner = createAsyncThunk(
   'list/updateWinner',
   async ( carData, { rejectWithValue, dispatch }) => {
      const data = await fetchUpdateWinner( carData );
      if ( data.isFailed ) return rejectWithValue();
      
      dispatch( getWinnersLists() ).unwrap();

      return data;
   }
);

const updateCar = createAsyncThunk(
   'list/updateCar',
   async ( carData, { rejectWithValue, dispatch }) => {
      const data = await fetchUpdateCar( carData );
      if ( data?.isFailed ) return rejectWithValue();

      dispatch( getGarageLists() ).unwrap();

      return null;
   }
);

const deleteCar = createAsyncThunk(
   'list/deleteCar',
   async ( id, { rejectWithValue, dispatch }) => {
      const data = await fetchDeleteCar( id );
      fetchDeleteWinner( id );
      if ( data.isFailed ) return rejectWithValue();
      
      dispatch( getGarageLists() ).unwrap();

      return data;
   }
);

const getGarageLists = createAsyncThunk(
   'list/getGarageLists',
   async ( props, { rejectWithValue, dispatch }) => {
      const data = await fetchGarageList();
      if ( data.isFailed ) return rejectWithValue();
         
      dispatch( getWinnersLists() ).unwrap();

      return data;
   }
);

const getWinnersLists = createAsyncThunk(
   'list/getWinnersLists',
   async ( props, { rejectWithValue }) => {
      const data = await fetchWinnersList();
      if ( data.isFailed ) return rejectWithValue();

      return data;
   }
);


const initialState = {
   garageList: [],
   winnersList: [],
   selectedCar: undefined,
   loading: false,
   race: false,
   winner: undefined,
};
   
const appSlice = createSlice({
   name: 'list',
   initialState,
   reducers: {
      setSelectedCar( state, { payload } ) {
         state.selectedCar = payload;
      },
      setRace( state, { payload } ) {
         if ( payload != 'finished' ) state.winner = undefined;
         state.race = payload
      },
      setWinner( state, { payload } ) {
         state.race = 'finished';
         state.winner = payload;
      }
   },
   extraReducers: ( builder ) => {
      builder
      .addCase( deleteCar.pending, ( state, { meta } ) => {
         if ( meta.arg == state?.selectedCar?.id ) {
            state.selectedCar = undefined;
         } 
         state.loading = true;
      })
      .addCase( generateCars.pending, ( state ) => {
         state.loading = true;   
      })
      .addCase( newWinner.pending, ( state, { meta} ) => {
         state.race = 'finished';
         state.winner = meta.arg;
      })
      .addCase( updateWinner.pending, ( state, { meta} ) => {
         state.race = 'finished';
         state.winner = meta.arg;
      })
      .addCase( addNewCar.pending, ( state ) => {
         state.loading = true;
      })
      .addCase( updateCar.pending, ( state ) => {
         state.loading = true;
      })
      .addCase( getGarageLists.pending, ( state ) => {
         state.loading = true;
      })
      .addCase( getGarageLists.fulfilled, ( state, { payload } ) => {
         state.garageList = payload;
      })
      .addCase( getWinnersLists.pending, ( state ) => {
      })
      .addCase( getWinnersLists.fulfilled, ( state, { payload } ) => {
         const restyleList = payload.map( winner => {
            const car = state.garageList.find( current => current.id === winner.id );
            if ( car?.name && car?.color ) return {
               ...winner,
               name: car?.name ?? 'Unknown',
               color: car?.color ?? '#000',
            };
         });
         state.winnersList = restyleList.filter( item => item );
         state.loading = false;
      })
      .addCase( getWinnersLists.rejected, ( state ) => {
         state.loading = false;
      })
   }
});

export const { 
   setRace,
   setSelectedCar,
} = appSlice.actions;
export { 
   getGarageLists,
   getWinnersLists,
   generateCars,
   addNewCar,
   updateCar,
   deleteCar,
   newWinner,
   updateWinner,
};
export default appSlice.reducer;