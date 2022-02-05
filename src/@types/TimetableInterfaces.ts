import { ITimeBlock } from './TimeBlockInterfaces'

export interface IDayData {
  [key: string]: ITimeBlock[]
  monday: ITimeBlock[]
  tuesday: ITimeBlock[]
  wednesday: ITimeBlock[]
  thursday: ITimeBlock[]
  friday: ITimeBlock[]
  saturday: ITimeBlock[]
  sunday: ITimeBlock[]
}

export interface ICurrentTimetableBlock {
  id: string
  title: string
  timeLeft: ITimeBlock
}
