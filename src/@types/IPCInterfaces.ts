import { IUserConfigs } from './UserConfigInterfaces';

export interface INotificationContent {
  title: string;
  body: string;
}

export interface IGetUserConfig extends IUserConfigs {
  readonly platform: 'darwin' | 'win32' | '';
  readonly appVersion: string;
}

export interface ISetUserConfig {
  configName: string;
  configValue: string | boolean;
}
