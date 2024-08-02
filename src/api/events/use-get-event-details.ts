import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import type { Event, Status } from '../types';

export type GetEventRequest = {
  event_id: string;
};

export type GetEventResponse = {
  status: Status;
  event: Event;
};

export const useGetEvent = (req: GetEventRequest) => {
  return useQuery({
    queryKey: ['event', { event_id: req.event_id }],
    queryFn: async (): Promise<GetEventResponse> => {
      return client.get(`event/${req.event_id}`).then((response) => {
        response.data.event.start_time = new Date(
          response.data.event.start_time
        );
        return response.data;
      });
    },
  });
};
