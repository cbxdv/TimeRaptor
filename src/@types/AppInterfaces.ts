export type PlatformStringTypes = 'darwin' | 'win32' | ''

export interface ITimeStamp {
  id: string
  type: 'timetable' | 'todo'
  title: string
  startTime: string
  endTime?: string
  description: string
}
