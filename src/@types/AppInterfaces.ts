export type PlatformStringTypes = 'darwin' | 'win32' | ''

export interface ITimeStamp {
  id: string
  type: 'timetable' | 'todo'
  title: string
  startTime: number
  endTime?: number
  description: string
}

export interface ITimeStampWithStrings {
  id: string
  type: 'timetable' | 'todo'
  title: string
  startTime: string
  endTime?: string
  description: string
}
