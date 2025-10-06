import axios from 'axios';

const API_BASE = 'http://localhost:3000';
const URLS = {
   garage: `${API_BASE}/garage`,
   winners: `${API_BASE}/winners`,
   engine: `${API_BASE}/engine`,
};

const ajax = async (url, { method = 'get', headers = {}, data = {}, returnHeaders }) => {
   try {
      const response = await axios({
         url,
         method,
         data,
         headers,
      });

      return returnHeaders
         ? {
              data: response.data,
              headers: { ...response.headers },
           }
         : response.data;
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

const fetchGarageListPage = async (pageNo) => {
   const queryParams = new URLSearchParams({ _page: pageNo, _limit: '7' });
   const data = await ajax(`${URLS.garage}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {},
      data: {},
      returnHeaders: true,
   });

   return data;
};

const fetchWinnersListPage = async (pageNo) => {
   const queryParams = new URLSearchParams({ _page: pageNo, _limit: '10' });
   const data = await ajax(`${URLS.winners}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {},
      data: {},
      returnHeaders: true,
   });

   return data;
};

const fetchCarData = async (id) => {
   const queryParams = new URLSearchParams({ id });
   const data = await ajax(`${URLS.garage}?${queryParams.toString()}`, {
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
   fetchUpdateCar,
   fetchDeleteCar,
   fetchNewCar,
   fetchCarEngineMode,
   fetchNewWinner,
   fetchUpdateWinner,
   fetchCarDrive,
   fetchGarageListPage,
   fetchWinnersListPage,
   fetchCarData,
};
export default ajax;
