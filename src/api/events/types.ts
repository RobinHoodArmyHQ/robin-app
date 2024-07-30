import type { Status } from '../types';

export type CreateEventResponse = {
  event_id: string;
  status: Status;
};

export type Location = {
  name?: string;
  latitude: number;
  longitude: number;
  google_place_id?: string;
};

export type Event = {
  event_id: string;
  title: string;
  description: string;
  event_type: string;
  event_location: Location;
  start_time: Date;
};

export type CreateEventRequest = {
  title: string;
  description: string;
  event_type: string;
  event_location: Location;
  start_time?: Date;
};

export type GetEventRequest = {
  event_id: string;
};

export type GetEventResponse = {
  status: Status;
  event: Event;
};
