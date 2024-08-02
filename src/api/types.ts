export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type Status = {
  success: boolean;
  message?: string;
};

export type Location = {
  name?: string;
  latitude: number;
  longitude: number;
  google_place_id?: string;
};

export type City = {
  city_id: string;
  name: string;
  country: Country;
};

export type Country = {
  country_id: string;
  name: string;
};

export type Event = {
  event_id: string;
  title: string;
  description: string;
  event_type: string;
  event_location: Location;
  start_time: Date;
};
