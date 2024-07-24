import { useQuery } from '@tanstack/react-query';

import { client } from '../common';

export type City = {
  city_id: string;
  name: string;
  country: Country;
};

export type Country = {
  country_id: string;
  name: string;
};

export type GetCitiesResponse = {
  status: {
    success: boolean;
    message: string;
  };
  cities: City[];
};

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async (): Promise<GetCitiesResponse> => {
      return client
        .get(`cities`)
        .then((response) => response.data)
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    },
  });
};

// createQuery<GetCitiesResponse, Variables, AxiosError>({
//   queryKey: ['cities'],
//   fetcher: () => {
//     return client.get(`cities`).then((response) => response.data);
//   },
// });
