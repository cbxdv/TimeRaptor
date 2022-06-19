export type PlatformStringTypes = 'darwin' | 'win32' | ''

export interface ITimeStamp {
  id: string
  time: number
  title: string
  secText: string
}

export interface ITimeStampWithStrings {
  id: string
  title: string
  time: string
  secText: string
}
