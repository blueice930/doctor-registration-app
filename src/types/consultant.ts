export interface Consultant {
  id: string,
  name: string,
  nameCN: string,
  email?: string,
  phone: string,
  timeslots: TimeSlot[],
}

export interface TimeSlot {
  weekday: Weekday,
  duration: number,
  start: string,
  end: string,
}

export enum Weekday {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}
