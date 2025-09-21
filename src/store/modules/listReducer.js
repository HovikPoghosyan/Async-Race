import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchGarageList, fetchWinnersList, fetchNewCar, fetchDeleteCar } from 'CONSTANTS/Axios';

const addNewCar = createAsyncThunk(
   'list/addNewCar',
   async ( carData, { rejectWithValue, dispatch }) => {
      const data = await fetchNewCar( carData );
      if ( data.isFailed ) return rejectWithValue();
      
      dispatch( getGarageLists() ).unwrap();

      return data;
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
   loading: false,
};

const appSlice = createSlice({
   name: 'list',
   initialState,
   reducers: {
      setGarageList( state, { payload } ) {
         state.garageList = payload;
      },
   },
   extraReducers: ( builder ) => {
      builder
      .addCase( deleteCar.pending, ( state ) => {
         state.loading = true;
      })
      .addCase( addNewCar.pending, ( state ) => {
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
} = appSlice.actions;
export { 
   getGarageLists,
   getWinnersLists,
   addNewCar,
   deleteCar,
};
export default appSlice.reducer;