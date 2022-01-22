const { app, ipcMain, Notification, shell, BrowserWindow } = require('electron');
const os = require('os');
const Store = require('electron-store');

const path = require('path');

const store = new Store();

ipcMain.handle('app:version', async () => {
  const appVersion = app.getVersion();
  return appVersion;
});

ipcMain.handle('timeblocks:get', async () => {
  const timeblocks = await store.get('timeblocks');
  return timeblocks;
});

ipcMain.on('timeblocks:update', async (_, dayData) => {
  store.set('timeblocks', dayData);
});

ipcMain.on('timeblocks:clear', () => {
  store.delete('timeblocks');
});

ipcMain.handle('userconfigs:get', async () => {
  const userConfigs = await store.get('userconfigs');
  const platform = os.platform()
  return { ...userConfigs, platform };
});

ipcMain.on('userconfig:set', (_, { configName, configValue }) => {
  store.set(`userconfigs.${configName}`, configValue);
});

ipcMain.on('app:notify', (_, { title, body }) => {
  new Notification({
    title: title || `Probably it's time`,
    body: body || 'Have a good time!',
    icon: path.join(__dirname, '../assets/Logo.png'),
  }).show();
});

ipcMain.on('app:openrepolink', () => {
  shell.openExternal('https://github.com/codeph0/TimeRaptor');
});

ipcMain.on('window:close', async () => {
  let win = BrowserWindow.getFocusedWindow()

  const close = await store.get('userconfigs.closeOnExit', false)
  if (close) {
    app.quit()
  } else {
    win.hide()
  }

})

ipcMain.on('window:minimize', () => {
  let win = BrowserWindow.getFocusedWindow()
  win.minimize()
})

ipcMain.on('window:maximize', () => {
  let win = BrowserWindow.getFocusedWindow()
  win.maximize()
})

ipcMain.on('window:restore', () => {
  let win = BrowserWindow.getFocusedWindow()
  win.restore()
})