const {
  app,
  ipcMain,
  Notification,
  shell,
  BrowserWindow
  // eslint-disable-next-line
} = require('electron');
const os = require('os');
const Store = require('electron-store');

const path = require('path');

const store = new Store();

ipcMain.handle('app:version', async () => {
  const appVersion = app.getVersion();
  return appVersion;
});

ipcMain.handle('timetable:get', async () => {
  const timetable = await store.get('timetable');
  return timetable;
});

ipcMain.on('timetable:update', async (_, dayData) => {
  store.set('timetable', dayData);
});

ipcMain.on('timetable:clear', () => {
  store.delete('timetable');
});

ipcMain.handle('userConfigs:get', async () => {
  const appVersion = app.getVersion();
  const userConfigs = await store.get('userConfigs');
  const platform = os.platform();
  return { ...userConfigs, platform, appVersion };
});

ipcMain.on('userConfig:set', (_, { configName, configValue }) => {
  store.set(`userConfigs.${configName}`, configValue);
});

ipcMain.on('app:notify', (_, { title, body }) => {
  new Notification({
    title: title || "Probably it's time",
    body: body || 'Have a good time!',
    icon: path.join(__dirname, '../assets/Logo.png')
  }).show();
});

ipcMain.on('app:openRepoLink', () => {
  shell.openExternal('https://github.com/codeph0/TimeRaptor');
});

ipcMain.on('window:close', async () => {
  const win = BrowserWindow.getFocusedWindow();

  const close = await store.get('userConfigs.closeOnExit', false);
  if (close) {
    app.quit();
  } else {
    win.hide();
  }
});

ipcMain.on('window:minimize', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.minimize();
});

ipcMain.on('window:maximize', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.maximize();
});

ipcMain.on('window:restore', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.restore();
});

ipcMain.on('window:reload', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.reload();
});
