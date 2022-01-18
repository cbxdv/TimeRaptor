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

ipcMain.on('timeblocks:update', async (_, data) => {
  store.set('timeblocks', data);
});

ipcMain.on('timeblocks:clear', () => {
  store.delete('timeblocks');
});

ipcMain.on('userconfigs:get', async () => {
  const userConfigs = await store.get('userconfigs');
  return userConfigs;
});

ipcMain.on('app:notify', (_, { title, body }) => {
  new Notification({
    title: title || '',
    body: body || '',
    icon: path.join(__dirname, '../assets/Logo.png'),
  }).show();
});

ipcMain.on('app:openlink', (_, link) => {
  shell.openExternal(link);
});
