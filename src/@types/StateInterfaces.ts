import {
  INotificationStates,
  ITimeStamp,
  PlatformStringTypes
} from './AppInterfaces'
import { ITimeBlock } from './TimeBlockInterfaces'
import { ITimetableDayData } from './TimetableInterfaces'
import { ITodosData } from './TodoInterface'
import { IConfigs } from './UserConfigInterfaces'

export interface IConfigsState extends IConfigs {
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
  notificationStates: INotificationStates
  status: string
  error: string | null
}

export interface IState {
  app: IAppState
  configs: IConfigsState
  timetable: ITimetableState
  todos: ITodosState
}
