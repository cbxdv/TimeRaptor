import { ITimeObject } from './DayAndTimeInterfaces'
import { ColorStringTypes } from './TimeBlockInterfaces'

interface IDayPlannerBlockBase {
  title: string
  startTime: ITimeObject
  endTime: ITimeObject
  day: DayPlannerDayTypes
  duration: number
  blockColor: ColorStringTypes
  description?: string
  isRecurringEveryday: boolean
}

export interface IDayPlannerBlock extends IDayPlannerBlockBase {
  readonly id: string
}

export interface IDayPlannerBlockPayloadAction extends IDayPlannerBlockBase {
  id: string
}

export type DayPlannerDayTypes = 'currentDay' | 'nextDay'

export interface IDayPlannerDayData {
  [DayPlannerDayTypes: number]: IDayPlannerBlock[]
  currentDay: IDayPlannerBlock[]
  nextDay: IDayPlannerBlock[]
}

export interface IDayPlannerData {
  lastUpdated: number
  dayData: IDayPlannerDayData
}

export interface IDayPlannerBlocksUpdatePayloadAction {
  oldBlock: IDayPlannerBlock
  newBlock: IDayPlannerBlock
}
