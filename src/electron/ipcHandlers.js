/* eslint-disable */
const {
  app,
  ipcMain,
  Notification,
  shell,
  BrowserWindow
} = require('electron');
const os = require('os');
const path = require('path')
const Store = require('electron-store');

const store = new Store();

ipcMain.handle('app:version', async () => {
  const appVersion = app.getVersion().toString();
  return appVersion;
});

ipcMain.handle('app:platform', async () => {
  const platform = os.platform().toString();
  return platform;
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

ipcMain.on('window:close', async () => {
  const win = BrowserWindow.getFocusedWindow();

  const close = await store.get('configs.appConfigs.closeOnExit', false);
  if (close) {
    app.quit();
  } else {
    win.hide();
  }
});

ipcMain.on('window:reload', () => {
  const win = BrowserWindow.getFocusedWindow();
  win.reload();
});

ipcMain.on('app:notify', (_, { title, body }) => {
  new Notification({
    title: title || "Probably it's time",
    body: body || 'Have a good time!',
    icon: path.join(__dirname, '../assets/Logo.png'),
  }).show();
});

ipcMain.on('app:openRepoLink', () => {
  shell.openExternal('https://github.com/codeph0/TimeRaptor');
});

ipcMain.handle('configs:get', async () => {
  const configs = await store.get('configs');
  return configs;
});

ipcMain.on('config:set', (_, { configName, configValue }) => {
  store.set(`configs.${configName}`, configValue);
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

ipcMain.handle('todos:get', async () => {
  const todos = await store.get('todos');
  return todos;
});

ipcMain.on('todos:update', async (_, todoData) => {
  store.set('todos', todoData);
});
