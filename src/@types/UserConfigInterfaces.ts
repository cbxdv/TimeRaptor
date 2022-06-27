export interface DaysToShow {
  [key: string]: boolean
  monday?: boolean
  tuesday?: boolean
  wednesday?: boolean
  thursday?: boolean
  friday?: boolean
  saturday?: boolean
  sunday?: boolean
}

export interface IAppConfigs {
  darkMode?: boolean
  closeOnExit?: boolean
  openMinimized?: boolean
}

export interface ITimetableConfigs {
  startNotifications?: boolean
  endNotifications?: boolean
  startNotificationsBefore?: number
  endNotificationsBefore?: number
  showCurrentTime?: boolean
  showCurrentBlock?: boolean
  daysToShow: DaysToShow
}

export interface ITodoConfigs {
  notifications?: boolean
  dayProcedures?: boolean
}

export interface IConfigs {
  timetableConfigs: ITimetableConfigs
  todoConfigs: ITodoConfigs
  appConfigs: IAppConfigs
}
