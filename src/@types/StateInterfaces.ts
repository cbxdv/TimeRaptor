import { ICurrentBlock, IDayData } from './TimetableInterfaces';
import { IUserConfigs } from './UserConfigInterfaces';

export interface IUserConfigsState {
  configurations: {
    readonly platform: 'darwin' | 'win32' | 'linux' | '';
    readonly appVersion: string;
    maximized: boolean;
  } & IUserConfigs;
  error: string | null;
  status: string;
}

export interface ITimetableState {
  dayData: IDayData;
  currentBlock: ICurrentBlock;
  status: string;
  error: string | null;
}

export interface IState {
  userConfigs: IUserConfigsState;
  timetable: ITimetableState;
}
