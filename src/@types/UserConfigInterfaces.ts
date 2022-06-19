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
  showCurrentTime?: boolean
  showCurrentBlock?: boolean
  daysToShow: DaysToShow
}
