import { ITimeStamp, PlatformStringTypes } from './AppInterfaces'
import { ICurrentTimetableBlock, IDayData } from './TimetableInterfaces'
import { ITodo } from './TodoInterfaces'
import { IAppConfigs, ITimetableConfigs } from './UserConfigInterfaces'

export interface IConfigsState {
  timetableConfigs: ITimetableConfigs
  appConfigs: IAppConfigs
  error: string | null
  status: string
}

export interface ITimetableState {
  dayData: IDayData
  status: string
  error: string | null
}

export interface ITodosState {
  todosData: ITodo[]
  status: string
  error: string | null
}

export interface IAppState {
  timeStamps: ITimeStamp[]
  timetableCurrentBlock: ICurrentTimetableBlock | null
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
