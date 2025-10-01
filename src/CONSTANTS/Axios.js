import axios from 'axios';

const API_BASE = 'http://localhost:3000';
const URLS = {
   garage: `${API_BASE}/garage`,
   winners: `${API_BASE}/winners`,
   engine: `${API_BASE}/engine`,
};

const ajax = async (url, { method = 'get', headers = {}, data = {} }) => {
   try {
      const response = await axios({
         url,
         method,
         data,
         headers,
      });
      return response?.data;
   } catch (axiosError) {
      return {
         isFailed: true,
         status: axiosError?.status,
         errors: {
            message: axiosError?.response?.data?.message || axiosError.message || 'Unknown Error',
            list: axiosError?.response?.data?.errors ? { ...axiosError.response.data.errors } : null,
         },
      };
   }
};

const fetchGarageList = async () => {
   const data = await ajax(URLS.garage, {
      method: 'GET',
      headers: {},
      data: {},
   });

   return data;
};

const fetchWinnersList = async () => {
   const data = await ajax(URLS.winners, {
      method: 'GET',
      headers: {},
      data: {},
   });

   return data;
};

const fetchNewCar = async (carData) => {
   const data = await ajax(URLS.garage, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      data: { ...carData },
   });

   return data;
};

const fetchDeleteCar = async (id) => {
   const data = await ajax(`${URLS.garage}/${id}`, {
      method: 'DELETE',
      headers: {},
      data: {},
   });

   return data;
};

const fetchUpdateCar = async (carData) => {
   const data = await ajax(`${URLS.garage}/${carData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: { ...carData },
   });

   return data;
};

const fetchCarEngineMode = async (id, status) => {
   const queryParams = new URLSearchParams({ id, status });
   const data = await ajax(`${URLS.engine}?${queryParams.toString()}`, {
      method: 'PATCH',
      headers: {},
      data: {},
   });

   return data;
};

const fetchNewWinner = async (carData) => {
   console.log('newWinner Data: ', carData);
   const data = await ajax(URLS.winners, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
         id: carData.id,
         wins: 1,
         time: carData.time,
      },
   });

   return data;
};

const fetchDeleteWinner = async (id) => {
   const data = await ajax(`${URLS.winners}/${id}`, {
      method: 'DELETE',
      headers: {},
      data: {},
   });

   return data;
};

const fetchUpdateWinner = async (carData) => {
   const data = await ajax(`${URLS.winners}/${carData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: {
         wins: carData.wins,
         time: carData.time,
      },
   });

   return data;
};

const fetchCarDrive = async (id) => {
   const queryParams = new URLSearchParams({ id, status: 'drive' });
   const data = await ajax(`${URLS.engine}?${queryParams.toString()}`, {
      method: 'PATCH',
      headers: {},
      data: {},
   });

   return data;
};

export {
   fetchDeleteWinner,
   fetchGarageList,
   fetchWinnersList,
   fetchUpdateCar,
   fetchDeleteCar,
   fetchNewCar,
   fetchCarEngineMode,
   fetchNewWinner,
   fetchUpdateWinner,
   fetchCarDrive,
};
export default ajax;
