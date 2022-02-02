import { getElectronContext } from './ElectronContext';

// eslint-disable-next-line import/prefer-default-export
export const timeBlockNotification = (title: string, description: string) => {
  const electron = getElectronContext();
  electron.appNotify({
    title: `${title} starts now`,
    body: `${description}`
  });
};
