export interface DaysToShow {
  [key: string]: boolean,
  monday?: boolean,
  tuesday?: boolean,
  wednesday?: boolean,
  thursday?: boolean,
  friday?: boolean,
  saturday?: boolean,
  sunday?: boolean
}

export interface IUserConfigs {
  notifications?: boolean;
  darkMode?: boolean;
  closeOnExit?: boolean;
  showCurrentTime?: boolean;
  showCurrentBlock?: boolean;
  openMinimized?: boolean,
  daysToShow: DaysToShow
}
