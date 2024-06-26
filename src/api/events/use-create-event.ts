import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { CreateEventRequest, CreateEventResponse } from './types';

export const useCreateEvent = createMutation<
  CreateEventResponse,
  CreateEventRequest,
  AxiosError
>({
  mutationFn: async (data) => {
    console.log(data);
    return client({
      url: '/event',
      method: 'POST',
      data: data,
    })
      .then((response) => {
        console.log('resp', response);
        return response.data;
      })
      .catch((error) => {
        console.log('error', error.message);
      });
  },
});
