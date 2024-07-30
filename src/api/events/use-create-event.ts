import { useMutation } from '@tanstack/react-query';

import { client } from '../common';
import type { CreateEventRequest, CreateEventResponse } from './types';

export const useCreateEvent = () => {
  return useMutation({
    scope: {
      id: 'event.create',
    },
    mutationFn: async (
      data: CreateEventRequest
    ): Promise<CreateEventResponse> => {
      return client.post(`event`, data).then((response) => response.data);
    },
  });
};
