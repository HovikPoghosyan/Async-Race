import axios from 'axios';

const API_BASE = 'http://localhost:3000';
const URLS = {
   garage: `${API_BASE}/garage`,
   winners: `${API_BASE}/winners`,
   engine: `${API_BASE}/engine`,
};

const ajax = async ( url, { method = 'get', headers = {}, data = {} } ) => {
   try {
      const response = await axios({
         url,
         method,
         data,
         headers,
      });
      return response.data;
   } catch ( axiosError ) {
      console.error('AJAX Error:', axiosError );
      return {
         isFailed: true,
         errors: {
            message: axiosError?.response?.data?.message || axiosError.message || 'Unknown Error',
            list: axiosError?.response?.data?.errors ? { ...axiosError.response.data.errors } : null,
         },
      };
   }
};

const fetchGarageList = async() => {
   const data = await ajax( URLS.garage, {
      method: 'GET',
      headers: { },
      data: { }
   } );

   return data;
};

const fetchWinnersList = async() => {
   const data = await ajax( URLS.winners, {
      method: 'GET',
      headers: { },
      data: { }
   } );

   return data;
};

const fetchNewCar = async( carData ) => {
   const data = await ajax( URLS.garage, {
      method: 'POST',
      headers: { 
         'Content-Type': 'application/json',
      },
      data: { ...carData }
   } );

   return data;
};

const fetchDeleteCar = async( id ) => {
   const data = await ajax( `${ URLS.garage }/${ id }`, {
      method: 'DELETE',
      headers: { },
      data: { }
   } );

   return data;
};

const fetchCarStart = async( id, status ) => {
   const queryParams = new URLSearchParams({ id, status });
   const data = await ajax( `${ URLS.engine }?${ queryParams.toString() }`, {
      method: 'PATCH',
      headers: { },
      data: { }
   } );

   return data;
}

export {
   fetchGarageList,
   fetchWinnersList,
   fetchDeleteCar,
   fetchNewCar,
   fetchCarStart,
};
export default ajax;
