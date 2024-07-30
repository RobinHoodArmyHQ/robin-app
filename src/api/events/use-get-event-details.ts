import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import type { GetEventRequest, GetEventResponse } from './types';

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
