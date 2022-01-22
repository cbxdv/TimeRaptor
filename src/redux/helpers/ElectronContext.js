/**
 * Extracts and returns the electron context object defined at window.
 * If nothing found, then an error is thrown with a message.
 * @returns Electron Context Object
 */
export const getElectronContext = () => {
  try {
    const electronContext = window.electron;
    if (!electronContext) {
      throw new Error();
    }
    return electronContext;
  } catch {
    throw 'Error connecting to context. Try restarting app.';
  }
};

export const saveBlocksToDisk = (dayData) => {
  try {
    const electronContext = getElectronContext();
    electronContext.updateTimeBlocks(dayData);
  } catch (error) {
    console.log(error);
  }
};

export const saveConfigToDisk = (configName, configValue) => {
  try {
    const electronContext = getElectronContext();
    electronContext.setUserConfig({ configName, configValue });
  } catch (error) {
    console.log(error);
  }
};

export const closeWindow = () => {
  try {
    const electronContext = getElectronContext();
    electronContext.closeWindow();
  } catch (error) {
    console.log(error);
  }
}

export const maximizeWindow = () => {
  try {
    const electronContext = getElectronContext();
    electronContext.maximizeWindow();
  } catch (error) {
    console.log(error);
  }
}

export const minimizeWindow = () => {
  try {
    const electronContext = getElectronContext();
    electronContext.minimizeWindow();
  } catch (error) {
    console.log(error);
  }
}

export const restoreWindow = () => {
  try {
    const electronContext = getElectronContext();
    electronContext.restoreWindow();
  } catch (error) {
    console.log(error);
  }
}
