import { useQuery } from '@tanstack/react-query';

import { client } from '../common';
import type { Event, Location, Status } from '../types';

export type GetUpcomingEventsRequest = {
  city_id: string;
  user_location: Location;
  offset: number;
  limit: number;
};

export type GetUpcomingEventsResponse = {
  status: Status;
  events: Event[];
};

export const useGetUpcomingEvents = (req: GetUpcomingEventsRequest) => {
  return useQuery({
    queryKey: ['events', { ...req }],
    queryFn: async (): Promise<GetUpcomingEventsResponse> => {
      return client.get(`events/`, { params: req }).then((response) => {
        response.data.events.forEach((event: Event) => {
          event.start_time = new Date(event.start_time);
        });

        return response.data;
      });
    },
  });
};
