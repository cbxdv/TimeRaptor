export type DayStringTypes =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | ''

export interface ITimeObject {
  hours: number
  minutes: number
  seconds?: number
  pm?: boolean
  day?: DayStringTypes
}

export interface IDayTypes {
  [key: string]: string | number
  sunday: 'Sunday' | 0
  monday: 'Monday' | 1
  tuesday: 'Tuesday' | 2
  wednesday: 'Wednesday' | 3
  thursday: 'Thursday' | 4
  friday: 'Friday' | 5
  saturday: 'Saturday' | 6
}
