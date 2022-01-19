import { getElectronContext } from '../redux/helpers/ElectronContext.js'

export const timeBlockNotification = (title, description) => {
  try {
    const electron = getElectronContext;
    electron.appNotify({
      title: `${title} starts Now`,
      body: `${description}`,
    });
  } catch (error) {
    console.log(error);
  }
};
