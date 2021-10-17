export interface Consultant {
  id: string,
  enabled?: boolean,
  name: string,
  nameCN: string,
  email?: string,
  phone: string,
  timeslots: TimeSlot,
}

export interface TimeSlot {
  id: number,
  day: Day[],
  duration: number,
  start: string,
  end: string,
}

export enum Day {
  MON=1,
  TUE=2,
  WED=3,
  THU=4,
  FRI=5,
  SAT=6,
  SUN=0,
}
