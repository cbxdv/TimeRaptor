import { ITimeBlock } from './TimeBlockInterfaces'

export interface ITimetableDayData {
  [key: string]: ITimeBlock[]
  monday: ITimeBlock[]
  tuesday: ITimeBlock[]
  wednesday: ITimeBlock[]
  thursday: ITimeBlock[]
  friday: ITimeBlock[]
  saturday: ITimeBlock[]
  sunday: ITimeBlock[]
}
