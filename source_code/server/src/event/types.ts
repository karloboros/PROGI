interface IEvent {
  id: number;
  name: string;
  description: string;
  image: string;
  startTime: Date;
  clubId: number;
  locationId: number;
}

export { IEvent };
