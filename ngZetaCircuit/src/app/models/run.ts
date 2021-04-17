import { User } from "./user";

export class Run {

  id: number;
  raceTitle: string;
  location: string;

  hours: number;
  minutes: number;
  seconds: number;

  distance: number;
  distanceUnit: string;
  notes: string;
  user: User;

  constructor(hours?: number){
    this.hours = hours;
  }
}
