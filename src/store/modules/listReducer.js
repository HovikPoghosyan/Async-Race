import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchGarageList, fetchWinnersList, fetchNewCar, fetchDeleteCar, fetchUpdateCar } from 'CONSTANTS/Axios';

const addNewCar = createAsyncThunk(
   'list/addNewCar',
   async ( carData, { rejectWithValue, dispatch }) => {
      const data = await fetchNewCar( carData );
      if ( data.isFailed ) return rejectWithValue();
      
      dispatch( getGarageLists() ).unwrap();

      return data;
   }
);

const updateCar = createAsyncThunk(
   'list/updateCar',
   async ( carData, { rejectWithValue, dispatch }) => {
      const data = await fetchUpdateCar( carData );
      if ( data?.isFailed ) return rejectWithValue();
      
      console.log('data: ', data);

      dispatch( getGarageLists() ).unwrap();

      return null;
   }
);

const deleteCar = createAsyncThunk(
   'list/deleteCar',
   async ( id, { rejectWithValue, dispatch }) => {
      console.log('deleting: ', id)
      const data = await fetchDeleteCar( id );
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
};

const appSlice = createSlice({
   name: 'list',
   initialState,
   reducers: {
      setSelectedCar( state, { payload } ) {
         state.selectedCar = payload;
      }
   },
   extraReducers: ( builder ) => {
      builder
      .addCase( deleteCar.pending, ( state, { meta } ) => {
         if ( meta.arg == state.selectedCar.id ) {
            state.selectedCar = undefined;
         }
         state.loading = true;
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
         state.loading = true;
      })
      .addCase( getWinnersLists.fulfilled, ( state, { payload } ) => {
         state.winnersList = payload.map( winner => {
            const car = state.garageList.find( current => current.id === winner.id );
            if ( car?.name && car?.color ) return {
               ...winner,
               name: car?.name ?? 'Unknown',
               color: car?.color ?? '#000',
            };
         }) ;
         state.loading = false;
      })
      .addCase( getWinnersLists.rejected, ( state ) => {
         state.loading = false;
      })
   }
});

export const { 
   setSelectedCar,
} = appSlice.actions;
export { 
   getGarageLists,
   getWinnersLists,
   addNewCar,
   updateCar,
   deleteCar,
};
export default appSlice.reducer;