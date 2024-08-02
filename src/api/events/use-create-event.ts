import { useMutation } from '@tanstack/react-query';

import { client } from '../common';
import type { Location, Status } from '../types';

export type CreateEventResponse = {
  event_id: string;
  status: Status;
};

export type CreateEventRequest = {
  title: string;
  description: string;
  event_type: string;
  event_location: Location;
  start_time?: Date;
};

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
