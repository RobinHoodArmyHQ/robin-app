import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import type { Status } from '../types';

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
  status: Status;
  cities: City[];
};

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async (): Promise<GetCitiesResponse> => {
      return client.get(`cities`).then((response) => response.data);
    },
  });
};
