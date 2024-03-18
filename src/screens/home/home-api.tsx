import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ENDPOINTS from '../../utils/apiEndPoints';

export type FlightType = {
  id: number;
  gate: string;
  price: number;
  origin: string;
  airline: string;
  aircraft: string;
  duration: string;
  arrivalTime: string;
  destination: string;
  flightNumber: string;
  departureTime: string;
  seatsAvailable: number;
};

const homeApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({baseUrl: ENDPOINTS.baseUrl}),
  endpoints: builder => ({
    getFlights: builder.query<FlightType[], void>({
      query: () => ({
        url: ENDPOINTS.getFlights,
      }),
    }),
  }),
});

export const {useGetFlightsQuery} = homeApi;

export default homeApi;
