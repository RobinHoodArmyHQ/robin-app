export type Status = {
  success: boolean;
  message: string;
};

export type CreateEventResponse = {
  event_id: string;
  status: Status;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type CreateEventRequest = {
  title: string;
  description: string;
  // time: EpochTimeStamp;
  event_type: string;
  event_location: Location | null;
};
