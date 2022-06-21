import { ITimeStamp, PlatformStringTypes } from './AppInterfaces'
import { ITimeBlock } from './TimeBlockInterfaces'
import { ITimetableDayData } from './TimetableInterfaces'
import { ITodoDayData } from './TodoInterface'
import { IAppConfigs, ITimetableConfigs } from './UserConfigInterfaces'

export interface IConfigsState {
  timetableConfigs: ITimetableConfigs
  appConfigs: IAppConfigs
  error: string | null
  status: string
}

export interface ITimetableState {
  dayData: ITimetableDayData
  currentTimeBlock: ITimeBlock | null
  status: string
  error: string | null
}

export interface ITodosState {
  dayData: ITodoDayData
  status: string
  error: string | null
}

export interface IAppState {
  timeStamps: ITimeStamp[]
  platform: PlatformStringTypes
  appVersion: string
  maximized: boolean
  isNotificationServiceRunning: boolean
  status: string
  error: string | null
}

export interface IState {
  app: IAppState
  configs: IConfigsState
  timetable: ITimetableState
  todos: ITodosState
}
