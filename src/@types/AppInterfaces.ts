export type PlatformStringTypes = 'darwin' | 'win32' | ''

export type AppModeTyes = 'timetable' | 'todo' | 'dayPlanner'

export interface ITimeStamp {
  id: string
  time: number
  title: string
  secText: string
  type: AppModeTyes
}

export interface ITimeStampWithStrings {
  id: string
  title: string
  time: string
  secText: string
  type: AppModeTyes
}

export interface INotificationStates {
  startTimetableNotifications: boolean
  endTimetableNotifications: boolean
  startTimetableNotificationsBefore: number
  endTimetableNotificationsBefore: number
  todoNotifications: boolean
  startDayPlannerNotifications: boolean
  endDayPlannerNotifications: boolean
  startDayPlannerNotificationsBefore: number
  endDayPlannerNotificationsBefore: number
}
