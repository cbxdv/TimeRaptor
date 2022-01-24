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
    // eslint-disable-next-line no-console
    console.log('Error connecting to context. Try restarting app.');
  }
  return null;
};

export const saveBlocksToDisk = dayData => {
  const electronContext = getElectronContext();
  electronContext.updateTimeBlocks(dayData);
};

export const saveConfigToDisk = (configName, configValue) => {
  const electronContext = getElectronContext();
  electronContext.setUserConfig({ configName, configValue });
};

export const closeWindow = () => {
  const electronContext = getElectronContext();
  electronContext.closeWindow();
};

export const maximizeWindow = () => {
  const electronContext = getElectronContext();
  electronContext.maximizeWindow();
};

export const minimizeWindow = () => {
  const electronContext = getElectronContext();
  electronContext.minimizeWindow();
};

export const restoreWindow = () => {
  const electronContext = getElectronContext();
  electronContext.restoreWindow();
};

export const reloadWindow = () => {
  const electronContext = getElectronContext();
  electronContext.reloadWindow();
};
