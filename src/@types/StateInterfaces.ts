import { ITimeStamp, PlatformStringTypes } from './AppInterfaces'
import { ITimeBlock } from './TimeBlockInterfaces'
import { ITimetableDayData } from './TimetableInterfaces'
import { ITodosData } from './TodoInterface'
import {
  IAppConfigs,
  ITimetableConfigs,
  ITodoConfigs
} from './UserConfigInterfaces'

export interface IConfigsState {
  timetableConfigs: ITimetableConfigs
  todoConfigs: ITodoConfigs
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

export interface ITodosState extends ITodosData {
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
