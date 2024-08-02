import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import type { City, Status } from '../types';

export type GetCitiesResponse = {
  status: Status;
  cities: City[];
};

export const useGetCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async (): Promise<GetCitiesResponse> => {
      return client.get(`cities`).then((response) => response.data);
    },
  });
};
