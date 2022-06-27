export type PlatformStringTypes = 'darwin' | 'win32' | ''

export interface ITimeStamp {
  id: string
  time: number
  title: string
  secText: string
  type: 'timetable' | 'todo'
}

export interface ITimeStampWithStrings {
  id: string
  title: string
  time: string
  secText: string
  type: 'timetable' | 'todo'
}

export interface INotificationStates {
  startTimetableNotifications: boolean
  endTimetableNotifications: boolean
  startTimetableNotificationsBefore: number
  endTimetableNotificationsBefore: number
  todoNotifications: boolean
}
