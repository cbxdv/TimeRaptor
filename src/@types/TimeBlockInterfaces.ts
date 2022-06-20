import { DayStringTypes, ITimeObject } from './DayAndTimeInterfaces'

interface ITimeBlockBase {
  title: string
  startTime: ITimeObject
  endTime: ITimeObject
  day: DayStringTypes
  duration: number
  blockColor: ColorStringTypes
  description?: string
}

export interface ITimeBlock extends ITimeBlockBase {
  readonly id: string
}

export interface TimeBlockPayloadAction extends ITimeBlockBase {
  id: string
}

export interface TimeBlockUpdatePayloadAction {
  oldBlock: TimeBlockPayloadAction
  newBlock: TimeBlockPayloadAction
}

export type CurrentTimeBlockUpdatePayloadAction = ITimeBlock | null

export interface NotificationStartPayloadAction {
  startNotifications: boolean
  endNotifications: boolean
  startNotificationsBefore: number
  endNotificationsBefore: number
}

export type ColorStringTypes =
  | 'decoPeach'
  | 'deepChampagne'
  | 'crayola'
  | 'teaGreen'
  | 'celeste'
  | 'babyBlueEyes'
  | 'greyedLavender'
  | 'mauve'
  | 'linen'
  | 'beige'

export interface IColors {
  [key: string]: string
  decoPeach: 'Deco Peach' | '#FFADAD'
  deepChampagne: 'Deep Champagne' | '#FFD6A5'
  crayola: 'Crayola' | '#FAE588'
  teaGreen: 'Tea Green' | '#CAFFBF'
  celeste: 'Celeste' | '#9BF6FF'
  babyBlueEyes: 'Baby Blue Eyes' | '#A0C4FF'
  greyedLavender: 'Greyed Lavender' | '#BDB2FF'
  mauve: 'Mauve' | '#FFC6FF'
  linen: 'Linen' | '#F5EBE0'
  beige: 'Beige' | '#EAF2D7'
}
