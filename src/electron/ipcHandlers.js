const { app, ipcMain, Notification, shell } = require('electron');
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
  return userConfigs;
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

ipcMain.on('app:openrepolink', (_, link) => {
  shell.openExternal('https://github.com/codeph0/TimeRaptor');
});
